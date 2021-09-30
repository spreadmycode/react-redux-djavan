import { all, fork, call, takeLatest, select, put, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { formValueSelector } from 'redux-form';
import { pickBy, pick, isEmpty, omitBy, isUndefined } from 'lodash';
import { push } from 'react-router-redux';
import qs from 'qs';

import simpleObjectDiff from 'src/helpers/simpleObjectDiff';

import * as c from './constants';
import { createIndustry, editIndustry, deleteIndustry } from './actions';
import { getCurrentIndustry } from './selectors';

function* listParamsChange() {
  // will cancel current running handleInput task
  yield takeLatest(c.LIST_FILTERS_CHANGE, function* handle() {
    yield call(delay, 500);
    const contains = yield select(
      formValueSelector('industryListFilterForm'),
      'contains',
    );

    const query = qs.stringify(pickBy({ contains }));

    yield put(push(`/industries/?${query}`));
  });
}

function* newIndustryFormChange() {
  while (true) {
    yield take(c.NEW_INDUSTRY_FORM_CHANGE);
    const state = yield select();
    const { values } = state.form.newIndustryForm;

    yield put(createIndustry({
      commit: true,
      ...values,
    }));
  }
}

function* createIndustrySuccess() {
  while (true) {
    const { response } = yield take(c.CREATE_INDUSTRY_SUCCESS);
    const { id } = response.data.industry;

    yield put(push(`/industries/${id}`));
  }
}

function* editIndustryFormChange() {
  while (true) {
    const { id } = yield take(c.EDIT_INDUSTRY_FORM_CHANGE);
    const state = yield select();
    const { values, registeredFields } = state.form.editIndustryForm;
    const industry = yield select(getCurrentIndustry);

    // since we put entire client to reduxForm using initialValues
    // we need to extract only those properties which are rendered on the page
    const keys = Object.keys(registeredFields);
    const diff = simpleObjectDiff(industry, pick(values, keys));

    if (!isEmpty(omitBy(diff, isUndefined))) {
      yield put(editIndustry(id, {
        commit: true,
        ...diff,
      }));
    }
  }
}

function* deleteIndustryTrigger() {
  while (true) {
    const { id } = yield take(c.DELETE_INDUSTRY_TRIGGER);

    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure want to delete the industry')) {
      yield put(deleteIndustry(id));
    }
  }
}

function* deleteIndustrySuccess() {
  while (true) {
    yield take(c.DELETE_INDUSTRY_SUCCESS);

    yield put(push('/industries'));
  }
}

export default function* createSaga() {
  yield all([
    fork(listParamsChange),
    fork(newIndustryFormChange),
    fork(createIndustrySuccess),
    fork(editIndustryFormChange),
    fork(deleteIndustryTrigger),
    fork(deleteIndustrySuccess),
  ]);
}
