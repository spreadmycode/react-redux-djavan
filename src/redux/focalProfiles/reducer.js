import { combineReducers } from 'redux';
import { map } from 'lodash';

import * as c from './constants';

const initialState = {
  data: {},
  ids: [],
};

function data(state = initialState.data) {
  return state;
}

function ids(state = initialState.ids, action) {
  switch (action.type) {
    case c.LOAD_FOCAL_PROFILES_SUCCESS:
      return map(action.response.data.focal_profiles, 'id');
    default:
      return state;
  }
}

export default combineReducers({
  data,
  ids,
});
