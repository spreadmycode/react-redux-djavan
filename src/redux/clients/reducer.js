import { combineReducers } from 'redux';
import { map } from 'lodash';

import { empty } from 'src/helpers';
import { validationErrorsHelper } from 'src/helpers/reducerHelpers';

import * as c from './constants';

const initialState = {
  data: {},
  ids: [],
  id: null,
  page: 1,
  pageCount: 1,
  validationErrors: empty,
};

function data(state = initialState.data) {
  return state;
}

function ids(state = initialState.ids, action) {
  switch (action.type) {
    case c.LOAD_CLIENTS_SUCCESS:
      return map(action.response.data.clients, 'id');
    default:
      return state;
  }
}

function id(state = initialState.id, action) {
  switch (action.type) {
    case c.LOAD_SINGLE_CLIENT_SUCCESS:
      return action.response.data.client.id;
    default:
      return state;
  }
}

function page(state = initialState.page, action) {
  switch (action.type) {
    case c.PAGE_CHANGE:
      return action.page;
    default:
      return state;
  }
}

function pageCount(state = initialState.pageCount, action) {
  switch (action.type) {
    case c.LOAD_CLIENTS_SUCCESS:
      return action.response.data.meta.total_pages;
    default:
      return state;
  }
}

function validationErrors(state = initialState.validationErrors, action) {
  switch (action.type) {
    case c.EDIT_CLIENT_FAIL:
    case c.CREATE_CLIENT_FAIL:
      return validationErrorsHelper(state, action);
    case c.EDIT_CLIENT_SUCCESS:
    case c.CREATE_CLIENT_SUCCESS:
      return empty;
    default:
      return state;
  }
}

export default combineReducers({
  data,
  ids,
  id,
  page,
  pageCount,
  validationErrors,
});
