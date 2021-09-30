import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import createReducer from './createReducer'; // Or wherever you keep your reducers
import createSaga from './createSaga';
import apiMiddleware from '../middlewares/apiMiddleware';

export default function configureStore(history, initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    thunkMiddleware,
    apiMiddleware(),

    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    window.devToolsExtension && __DEVTOOLS__ ? window.devToolsExtension() : f => f,
  ];

  const store = createStore(
        createReducer(),
        initialState,
        compose(...enhancers),
    );

  if (module.hot) {
    module.hot.accept('./createReducer', () => {
      store.replaceReducer(require('./createReducer')()); // eslint-disable-line global-require
    });
  }

  sagaMiddleware.run(createSaga);

  return store;
}
