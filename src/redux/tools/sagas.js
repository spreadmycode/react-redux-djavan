import { all, fork, call, takeLatest, select, put, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { formValueSelector } from 'redux-form';
import { pickBy, pick, isEmpty, omitBy, isUndefined } from 'lodash';
import { push } from 'react-router-redux';
import qs from 'qs';

import { simpleObjectDiff } from 'src/helpers';

import * as c from './constants';
import { createTool, editTool, deleteTool } from './actions';
import { getCurrentTool } from './selectors';

function* listParamsChange() {
  // will cancel current running handleInput task
  yield takeLatest(c.LIST_FILTERS_CHANGE, function* handle() {
    yield call(delay, 500);
    const contains = yield select(
      formValueSelector('toolListFilterForm'),
      'contains',
    );

    const query = qs.stringify(pickBy({ contains }));

    yield put(push(`/tools/?${query}`));
  });
}

function* newToolFormChange() {
  while (true) {
    yield take(c.NEW_TOOL_FORM_CHANGE);
    const state = yield select();
    const { values } = state.form.newToolForm;

    yield put(createTool({
      commit: true,
      ...values,
    }));
  }
}

function* createToolSuccess() {
  while (true) {
    const { response } = yield take(c.CREATE_TOOL_SUCCESS);
    const { id } = response.data.tool;

    yield put(push(`/tools/${id}`));
  }
}

function* editToolFormChange() {
  while (true) {
    const { id } = yield take(c.EDIT_TOOL_FORM_CHANGE);
    const state = yield select();
    const { values, registeredFields } = state.form.editToolForm;
    const tool = yield select(getCurrentTool);

    // since we put entire client to reduxForm using initialValues
    // we need to extract only those properties which are rendered on the page
    const keys = Object.keys(registeredFields);
    const diff = simpleObjectDiff(tool, pick(values, keys));

    if (!isEmpty(omitBy(diff, isUndefined))) {
      yield put(editTool(id, {
        commit: true,
        ...diff,
      }));
    }
  }
}

function* deleteToolTrigger() {
  while (true) {
    const { id } = yield take(c.DELETE_TOOL_TRIGGER);

    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure want to delete the tool?')) {
      yield put(deleteTool(id));
    }
  }
}

function* deleteToolSuccess() {
  while (true) {
    yield take(c.DELETE_TOOL_SUCCESS);

    yield put(push('/tools'));
  }
}

export default function* createSaga() {
  yield all([
    fork(listParamsChange),
    fork(newToolFormChange),
    fork(createToolSuccess),
    fork(editToolFormChange),
    fork(deleteToolTrigger),
    fork(deleteToolSuccess),
  ]);
}
