import { combineReducers } from 'redux';

import { empty } from 'src/helpers';
import { validationErrorsHelper, choicesHelper } from 'src/helpers/reducerHelpers';

import * as c from './constants';

const initialState = {
  data: {},
  id: null,
  validationErrors: empty,
  choices: null,
  validationErrorsPerId: {},
};

function data(state = initialState.data) {
  return state;
}

function id(state = initialState.id, action) {
  switch (action.type) {
    case c.LOAD_SINGLE_SERVICE_INSTANCE_SUCCESS:
      return action.response.data.service_instance.id;
    default:
      return state;
  }
}

function validationErrors(state = initialState.validationErrors, action) {
  switch (action.type) {
    case c.EDIT_SERVICE_INSTANCE_FAIL:
    case c.CREATE_SERVICE_INSTANCE_FAIL:
      return validationErrorsHelper(state, action);
    case c.EDIT_SERVICE_INSTANCE_SUCCESS:
    case c.CREATE_SERVICE_INSTANCE_SUCCESS:
      return empty;
    default:
      return state;
  }
}

function choices(state = initialState.choices, action) {
  switch (action.type) {
    case c.LOAD_SERVICE_INSTANCE_CHOICES_SUCCESS:
      return choicesHelper(state, action);
    default:
      return state;
  }
}

function validationErrorsPerId(state = initialState.validationErrorsPerId, action) {
  switch (action.type) {
    case c.EDIT_SERVICE_INSTANCE_FAIL:
      return {
        ...state,
        [action.id]: validationErrorsHelper(state, action),
      };
    case c.CREATE_SERVICE_INSTANCE_FAIL:
      return {
        ...state,
        new: validationErrorsHelper(state, action),
      };
    case c.EDIT_SERVICE_INSTANCE_SUCCESS:
      return {
        ...state,
        [action.id]: {},
      };
    case c.CREATE_SERVICE_INSTANCE_SUCCESS:
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
  id,
  validationErrors,
  choices,
  validationErrorsPerId,
});
