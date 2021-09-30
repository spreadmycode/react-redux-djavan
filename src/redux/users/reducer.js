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
  me: null,
  validationErrors: empty,
};

function data(state = initialState.data) {
  return state;
}

function ids(state = initialState.ids, action) {
  switch (action.type) {
    case c.LOAD_USERS_SUCCESS:
      return map(action.response.data.users, 'id');
    default:
      return state;
  }
}

function id(state = initialState.id, action) {
  switch (action.type) {
    case c.LOAD_SINGLE_USER_SUCCESS:
      return action.response.data.user.id;
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
    case c.LOAD_USERS_SUCCESS:
      return action.response.data.meta.total_pages;
    default:
      return state;
  }
}

function me(state = initialState.me, action) {
  switch (action.type) {
    case c.LOGIN_SUCCESS:
    case c.REFRESH_TOKEN_SUCCESS:
      return action.response.data.user.id;
    case c.LOGOUT:
      return null;
    default:
      return state;
  }
}

function validationErrors(state = initialState.validationErrors, action) {
  switch (action.type) {
    case c.LOGIN_FAIL: {
      return validationErrorsHelper(state, action);
    }
    case c.LOGIN_SUCCESS:
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
  me,
  validationErrors,
});
