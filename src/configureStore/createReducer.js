import { routerReducer } from 'react-router-redux';
import reduceReducers from 'reduce-reducers';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as reducers from 'src/redux/reducers';

import rootReducer from './rootReducer';

export default function createReducer() {
  return reduceReducers(
    rootReducer,
    combineReducers({
      routing: routerReducer,
      form: formReducer,
      reduxAsyncConnect,
      ...reducers,
    }),
  );
}
