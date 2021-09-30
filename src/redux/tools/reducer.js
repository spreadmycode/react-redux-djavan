import { combineReducers } from 'redux';
import { map } from 'lodash';

import { empty } from 'src/helpers';
import { validationErrorsHelper, choicesHelper } from 'src/helpers/reducerHelpers';

import * as c from './constants';

const initialState = {
  data: {},
  ids: [],
  id: null,
  choices: null,
  validationErrors: empty,
};

function data(state = initialState.data) {
  return state;
}

function ids(state = initialState.ids, action) {
  switch (action.type) {
    case c.LOAD_TOOLS_SUCCESS:
      return map(action.response.data.tools, 'id');
    default:
      return state;
  }
}

function id(state = initialState.id, action) {
  switch (action.type) {
    case c.LOAD_SINGLE_TOOL_SUCCESS:
      return action.response.data.tool.id;
    default:
      return state;
  }
}

function choices(state = initialState.choices, action) {
  switch (action.type) {
    case c.LOAD_TOOL_CHOICES_SUCCESS:
      return choicesHelper(state, action);
    default:
      return state;
  }
}

function validationErrors(state = initialState.validationErrors, action) {
  switch (action.type) {
    case c.EDIT_TOOL_FAIL:
    case c.CREATE_TOOL_FAIL:
      return validationErrorsHelper(state, action);
    case c.EDIT_TOOL_SUCCESS:
    case c.CREATE_TOOL_SUCCESS:
      return empty;
    default:
      return state;
  }
}

export default combineReducers({
  data,
  ids,
  id,
  choices,
  validationErrors,
});
