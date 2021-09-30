import { combineReducers } from 'redux';

import { validationErrorsHelper, choicesHelper } from 'src/helpers/reducerHelpers';

import * as c from './constants';

const initialState = {
  data: {},
  validationErrorsPerId: {},
  choices: null,
};

function data(state = initialState.data) {
  return state;
}

function validationErrorsPerId(state = initialState.validationErrorsPerId, action) {
  switch (action.type) {
    case c.EDIT_SERVICE_GROUP_FAIL:
      return {
        ...state,
        [action.id]: validationErrorsHelper(state, action),
      };
    case c.EDIT_SERVICE_GROUP_SUCCESS:
      return {
        ...state,
        [action.id]: {},
      };
    default:
      return state;
  }
}

function choices(state = initialState.choices, action) {
  switch (action.type) {
    case c.LOAD_SERVICE_GROUP_CHOICES_SUCCESS:
      return choicesHelper(state, action);
    default:
      return state;
  }
}

export default combineReducers({
  data,
  validationErrorsPerId,
  choices,
});
