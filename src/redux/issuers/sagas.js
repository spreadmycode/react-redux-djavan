import { all, fork, call, takeLatest, select, put, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { formValueSelector } from 'redux-form';
import { pickBy, pick, isEmpty, omitBy, isUndefined } from 'lodash';
import { push } from 'react-router-redux';
import qs from 'qs';

import simpleObjectDiff from 'src/helpers/simpleObjectDiff';

import * as c from './constants';
import { createIssuer, editIssuer, deleteIssuer } from './actions';
import { getCurrentIssuer } from './selectors';

function* listParamsChange() {
  // will cancel current running handleInput task
  yield takeLatest(c.LIST_FILTERS_CHANGE, function* handle() {
    yield call(delay, 500);
    const contains = yield select(
      formValueSelector('issuerListFilterForm'),
      'contains',
    );

    const query = qs.stringify(pickBy({ contains }));

    yield put(push(`/issuers/?${query}`));
  });
}

function* newIssuerFormChange() {
  while (true) {
    yield take(c.NEW_ISSUER_FORM_CHANGE);
    const state = yield select();
    const { values } = state.form.newIssuerForm;

    yield put(createIssuer({
      commit: true,
      ...values,
    }));
  }
}

function* createIssuerSuccess() {
  while (true) {
    const { response } = yield take(c.CREATE_ISSUER_SUCCESS);
    const { id } = response.data.issuer;

    yield put(push(`/issuers/${id}`));
  }
}

function* editIssuerFormChange() {
  while (true) {
    const { id } = yield take(c.EDIT_ISSUER_FORM_CHANGE);
    const state = yield select();
    const { values, registeredFields } = state.form.editIssuerForm;
    const issuer = yield select(getCurrentIssuer);

    // since we put entire client to reduxForm using initialValues
    // we need to extract only those properties which are rendered on the page
    const keys = Object.keys(registeredFields);
    const diff = simpleObjectDiff(issuer, pick(values, keys));

    if (!isEmpty(omitBy(diff, isUndefined))) {
      yield put(editIssuer(id, {
        commit: true,
        ...diff,
      }));
    }
  }
}

function* deleteIssuerTrigger() {
  while (true) {
    const { id } = yield take(c.DELETE_ISSUER_TRIGGER);

    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure want to delete the issuer')) {
      yield put(deleteIssuer(id));
    }
  }
}

function* deleteIssuerSuccess() {
  while (true) {
    yield take(c.DELETE_ISSUER_SUCCESS);

    yield put(push('/issuers'));
  }
}

export default function* createSaga() {
  yield all([
    fork(listParamsChange),
    fork(newIssuerFormChange),
    fork(createIssuerSuccess),
    fork(editIssuerFormChange),
    fork(deleteIssuerTrigger),
    fork(deleteIssuerSuccess),
  ]);
}
