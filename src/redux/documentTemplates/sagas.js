import { all, fork, call, takeLatest, select, put, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { formValueSelector } from 'redux-form';
import { pickBy, pick, isEmpty, omitBy, isUndefined } from 'lodash';
import { push } from 'react-router-redux';
import qs from 'qs';

import simpleObjectDiff from 'src/helpers/simpleObjectDiff';

import * as c from './constants';
import { createDocumentTemplate, editDocumentTemplate, deleteDocumentTemplate } from './actions';
import { getCurrentDocumentTemplate } from './selectors';

function* listParamsChange() {
  // will cancel current running handleInput task
  yield takeLatest(c.LIST_FILTERS_CHANGE, function* handle() {
    yield call(delay, 500);
    const params = yield select(
      formValueSelector('documentTemplateListFilterForm'),
      'issuer',
      'category',
      'is_default',
    );

    const query = qs.stringify(pickBy(params));

    yield put(push(`/document-templates/?${query}`));
  });
}

function* newDocumentTemplateFormChange() {
  while (true) {
    yield take(c.NEW_DOCUMENT_TEMPLATE_FORM_CHANGE);
    const state = yield select();
    const { values } = state.form.newDocumentTemplateForm;

    yield put(createDocumentTemplate({
      commit: true,
      ...values,
    }));
  }
}

function* createDocumentTemplateSuccess() {
  while (true) {
    const { response } = yield take(c.CREATE_DOCUMENT_TEMPLATE_SUCCESS);
    const { id } = response.data.document_template;

    yield put(push(`/document-templates/${id}`));
  }
}

function* editDocumentTemplateFormChange() {
  while (true) {
    const { id } = yield take(c.EDIT_DOCUMENT_TEMPLATE_FORM_CHANGE);
    const state = yield select();
    const { values, registeredFields } = state.form.editDocumentTemplateForm;
    const tool = yield select(getCurrentDocumentTemplate);

    // since we put entire client to reduxForm using initialValues
    // we need to extract only those properties which are rendered on the page
    const keys = Object.keys(registeredFields);
    const diff = simpleObjectDiff(tool, pick(values, keys));

    if (!isEmpty(omitBy(diff, isUndefined))) {
      yield put(editDocumentTemplate(id, {
        commit: true,
        ...diff,
      }));
    }
  }
}

function* deleteDocumentTemplateTrigger() {
  while (true) {
    const { id } = yield take(c.DELETE_DOCUMENT_TEMPLATE_TRIGGER);

    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure want to delete the template?')) {
      yield put(deleteDocumentTemplate(id));
    }
  }
}

function* deleteDocumentTemplateSuccess() {
  while (true) {
    yield take(c.DELETE_DOCUMENT_TEMPLATE_SUCCESS);

    yield put(push('/document-templates'));
  }
}

export default function* createSaga() {
  yield all([
    fork(listParamsChange),
    fork(newDocumentTemplateFormChange),
    fork(createDocumentTemplateSuccess),
    fork(editDocumentTemplateFormChange),
    fork(deleteDocumentTemplateTrigger),
    fork(deleteDocumentTemplateSuccess),
  ]);
}
