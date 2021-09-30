import { all, fork, select, put, take } from 'redux-saga/effects';
import { formValueSelector } from 'redux-form';
import { isEmpty, omit, omitBy, isUndefined } from 'lodash';

import { simpleObjectDiff } from 'src/helpers';
import { loadSingleServiceOrder } from 'src/redux/serviceOrders/actions';

import * as c from './constants';
import { editServiceGroup, deleteServiceGroup } from './actions';
import { getSpecifiedServiceGroup } from './selectors';

function* deleteServiceGroupTrigger() {
  while (true) {
    const { id } = yield take(c.DELETE_SERVICE_GROUP_TRIGGER);

    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure want to delete the service group')) {
      yield put(deleteServiceGroup(id));
    }
  }
}

function* editServiceGroupFieldChange() {
  while (true) {
    const { id, path } = yield take(c.EDIT_SERVICE_GROUP_FIELD_CHANGE);
    const data = yield select(
      formValueSelector('editServiceOrderForm'),
      path,
    );

    const serviceGroup = yield select(
      getSpecifiedServiceGroup,
      id,
    );

    const diff = simpleObjectDiff(
      serviceGroup,
      omit(data, ['service_instances', 'adjustments']),
    );

    if (!isEmpty(omitBy(diff, isUndefined))) {
      yield put.sync(editServiceGroup(id, {
        commit: true,
        ...diff,
      }));
    }
  }
}

function* updateAdjustmentSuccess() {
  while (true) {
    const { response, id } = yield take([
      c.CREATE_SERVICE_GROUP_SUCCESS,
      c.EDIT_SERVICE_GROUP_SUCCESS,
      c.DELETE_SERVICE_GROUP_SUCCESS,
    ]);

    const { service_order_id, primary_service_order_id } = yield select(
      getSpecifiedServiceGroup,
      id || response.data.service_group.id,
    );

    yield put(
      loadSingleServiceOrder(service_order_id || primary_service_order_id),
    );
  }
}

export default function* createSaga() {
  yield all([
    fork(deleteServiceGroupTrigger),
    fork(editServiceGroupFieldChange),
    fork(updateAdjustmentSuccess),
  ]);
}
