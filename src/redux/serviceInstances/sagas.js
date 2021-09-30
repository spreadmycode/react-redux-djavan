import { all, fork, select, put, take } from 'redux-saga/effects';
import { formValueSelector } from 'redux-form';
import { isEmpty, omit, pick, omitBy, isUndefined } from 'lodash';
import { push } from 'react-router-redux';

import { simpleObjectDiff } from 'src/helpers';
import { loadSingleServiceGroup } from 'src/redux/serviceGroups/actions';
import { getSpecifiedServiceGroup } from 'src/redux/serviceGroups/selectors';

import * as c from './constants';
import { editServiceInstance, deleteServiceInstance } from './actions';
import { getSpecifiedServiceInstance } from './selectors';


function* deleteServiceInstanceTrigger() {
  while (true) {
    const { id, shouldRedirect } = yield take(c.DELETE_SERVICE_INSTANCE_TRIGGER);

    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure want to delete the service instance?')) {
      yield put(deleteServiceInstance(id, shouldRedirect));
    }
  }
}

function* deleteServiceInstanceSuccess() {
  while (true) {
    const { id, shouldRedirect } = yield take(c.DELETE_SERVICE_INSTANCE_SUCCESS);

    if (shouldRedirect) {
      const { service_group_id } = yield select(getSpecifiedServiceInstance, id);
      const {
        service_order_id,
        primary_service_order_id,
      } = yield select(getSpecifiedServiceGroup, service_group_id);

      yield put(push(`/service-orders/${service_order_id || primary_service_order_id}`));
    }
  }
}

function* editServiceInstanceFieldChange() {
  while (true) {
    const { id, path } = yield take(c.EDIT_SERVICE_INSTANCE_FIELD_CHANGE);
    let diff;

    if (path) { // if change is made at service order page
      const data = yield select(
        formValueSelector('editServiceOrderForm'),
        path,
      );

      const serviceInstance = yield select(
        getSpecifiedServiceInstance,
        id,
      );

      diff = simpleObjectDiff(serviceInstance, omit(data, []));
    } else {
      const state = yield select();
      const { values, registeredFields } = state.form.editServiceInstanceForm;
      const serviceInstance = yield select(
        getSpecifiedServiceInstance,
        id,
      );

      // since we put entire client to reduxForm using initialValues
      // we need to extract only those properties which are rendered on the page
      const keys = Object.keys(registeredFields);
      diff = simpleObjectDiff(serviceInstance, omit(pick(values, keys), ['adjustments']));
    }

    if (!isEmpty(omitBy(diff, isUndefined))) {
      yield put(editServiceInstance(id, {
        commit: true,
        ...diff,
      }));
    }
  }
}

function* updateAdjustmentSuccess() {
  while (true) {
    const { response, id } = yield take([
      c.CREATE_SERVICE_INSTANCE_SUCCESS,
      c.EDIT_SERVICE_INSTANCE_SUCCESS,
      c.DELETE_SERVICE_INSTANCE_SUCCESS,
    ]);

    const { service_group_id } = yield select(
      getSpecifiedServiceInstance,
      id || response.data.service_instance.id,
    );

    yield put(loadSingleServiceGroup(service_group_id));
  }
}

export default function* createSaga() {
  yield all([
    fork(deleteServiceInstanceTrigger),
    fork(deleteServiceInstanceSuccess),
    fork(editServiceInstanceFieldChange),
    fork(updateAdjustmentSuccess),
  ]);
}
