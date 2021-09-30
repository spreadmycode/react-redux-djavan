import { combineReducers } from 'redux';
import { map } from 'lodash';

import { empty } from 'src/helpers';
import { validationErrorsHelper } from 'src/helpers/reducerHelpers';

import * as c from './constants';

const initialState = {
  data: {},
  ids: [],
  id: null,
  validationErrors: empty,
};

function data(state = initialState.data) {
  return state;
}

function ids(state = initialState.ids, action) {
  switch (action.type) {
    case c.LOAD_INDUSTRIES_SUCCESS:
      return map(action.response.data.industries, 'id');
    default:
      return state;
  }
}

function id(state = initialState.id, action) {
  switch (action.type) {
    case c.LOAD_SINGLE_INDUSTRY_SUCCESS:
      return action.response.data.industry.id;
    default:
      return state;
  }
}

function validationErrors(state = initialState.validationErrors, action) {
  switch (action.type) {
    case c.EDIT_INDUSTRY_FAIL:
    case c.CREATE_INDUSTRY_FAIL:
      return validationErrorsHelper(state, action);
    case c.EDIT_INDUSTRY_SUCCESS:
    case c.CREATE_INDUSTRY_SUCCESS:
      return empty;
    default:
      return state;
  }
}

export default combineReducers({
  data,
  ids,
  id,
  validationErrors,
});
