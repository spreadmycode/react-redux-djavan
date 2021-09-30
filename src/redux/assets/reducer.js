import { combineReducers } from 'redux';

const initialState = {
  data: {},
};

function data(state = initialState.data) {
  return state;
}

export default combineReducers({
  data,
});
