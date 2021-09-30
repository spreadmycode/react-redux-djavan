import { all, fork, call, takeLatest, select, put, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { formValueSelector } from 'redux-form';
import { pickBy, pick, isEmpty, omit, omitBy, isUndefined } from 'lodash';
import { push } from 'react-router-redux';
import qs from 'qs';

import { simpleObjectDiff } from 'src/helpers';

import * as c from './constants';
import { createServiceOrder, editServiceOrder, deleteServiceOrder } from './actions';
import { getCurrentServiceOrder } from './selectors';


function* listParamsChange() {
  // will cancel current running handleInput task
  yield takeLatest([c.LIST_FILTERS_CHANGE, c.PAGE_CHANGE], function* handle() {
    yield call(delay, 500);
    const params = yield select(
      formValueSelector('serviceOrderListFilterForm'),
      'client', 'sort', 'per_page', 'status',
    );

    const { serviceOrders } = yield select();
    const { page } = serviceOrders;

    if (page > 1) {
      params.page = page;
    }

    const query = qs.stringify(pickBy(params));

    yield put(push(`/service-orders/?${query}`));
  });
}


function* newServiceOrderFormChange() {
  while (true) {
    yield take(c.NEW_SERVICE_ORDER_FORM_CHANGE);
    const state = yield select();
    const { values } = state.form.newServiceOrderForm;

    yield put(createServiceOrder({
      commit: true,
      ...values,
    }));
  }
}

function* createServiceOrderSuccess() {
  while (true) {
    const { response } = yield take(c.CREATE_SERVICE_ORDER_SUCCESS);
    const { id } = response.data.service_order;

    yield put(push(`/service-orders/${id}`));
  }
}

function* editServiceOrderFormChange() {
  while (true) {
    const { id } = yield take(c.EDIT_SERVICE_ORDER_FORM_CHANGE);
    const state = yield select();
    const { values, registeredFields } = state.form.editServiceOrderForm;
    const serviceOrder = yield select(getCurrentServiceOrder);

    // since we put entire client to reduxForm using initialValues
    // we need to extract only those properties which are rendered on the page
    const keys = Object.keys(registeredFields);

    const diff = simpleObjectDiff(
      serviceOrder,
      omit(
        pick(values, keys),
        ['primary_service_group', 'service_groups'],
      ),
    );


    if (!isEmpty(omitBy(diff, isUndefined))) {
      yield put(editServiceOrder(id, {
        commit: true,
        ...diff,
      }));
    }
  }
}

function* deleteServiceOrderTrigger() {
  while (true) {
    const { id } = yield take(c.DELETE_SERVICE_ORDER_TRIGGER);

    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure want to delete the service order')) {
      yield put(deleteServiceOrder(id));
    }
  }
}

function* deleteServiceOrderSuccess() {
  while (true) {
    yield take(c.DELETE_SERVICE_ORDER_SUCCESS);

    yield put(push('/service-orders'));
  }
}

export default function* createSaga() {
  yield all([
    fork(listParamsChange),
    fork(newServiceOrderFormChange),
    fork(createServiceOrderSuccess),
    fork(editServiceOrderFormChange),
    fork(deleteServiceOrderTrigger),
    fork(deleteServiceOrderSuccess),
  ]);
}
