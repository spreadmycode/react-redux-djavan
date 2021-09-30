import { combineReducers } from 'redux';

import { empty } from 'src/helpers';

const initialState = {
  reachedLocations: empty,
};

function reachedLocations(state = initialState.reachedLocations, action) {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE': {
      const { payload } = action;
      const { pathname } = payload;

      return {
        ...state,
        [pathname.split('/')[1]]: payload,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  reachedLocations,
});
