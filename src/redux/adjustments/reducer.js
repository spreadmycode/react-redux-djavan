import { combineReducers } from 'redux';

import { validationErrorsHelper } from 'src/helpers/reducerHelpers';

import * as c from './constants';

const initialState = {
  data: {},
  validationErrorsPerId: {},
};

function data(state = initialState.data) {
  return state;
}

function validationErrorsPerId(state = initialState.validationErrorsPerId, action) {
  switch (action.type) {
    case c.EDIT_ADJUSTMENT_FAIL:
      return {
        ...state,
        [action.id]: validationErrorsHelper(state, action),
      };
    case c.CREATE_ADJUSTMENT_FAIL:
      return {
        ...state,
        new: validationErrorsHelper(state, action),
      };
    case c.EDIT_ADJUSTMENT_SUCCESS:
      return {
        ...state,
        [action.id]: {},
      };
    case c.CREATE_ADJUSTMENT_SUCCESS:
      return {
        ...state,
        new: {},
      };
    default:
      return state;
  }
}

export default combineReducers({
  data,
  validationErrorsPerId,
});
