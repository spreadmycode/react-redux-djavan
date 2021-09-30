import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import browserHistory from 'react-router/es/browserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import './global-style';
import configureStore from './configureStore';
import Routes from './Routes';

const initialState = {};
const store = configureStore(browserHistory, initialState);
const history = syncHistoryWithStore(browserHistory, store);

if (false && process.env.NODE_ENV === 'development') { // eslint-disable-line no-constant-condition
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  const { whyDidYouUpdate } = require('why-did-you-update');
  let createClass = React.createClass; // eslint-disable-line no-unused-vars
  Object.defineProperty(React, 'createClass', {
    set: (nextCreateClass) => {
      createClass = nextCreateClass;
    },
  });
  whyDidYouUpdate(React);
}

const rootEl = window.document.getElementById('react-view');

const renderApp = routes => (
  <AppContainer>
    <Provider store={store} key="provider">
      {routes}
    </Provider>
  </AppContainer>
);

ReactDOM.render(renderApp(<Routes history={history} />), rootEl);

if (module.hot) {
  module.hot.accept('./Routes', () => {
    // eslint-disable-next-line no-shadow, global-require
    const { default: Routes } = require('./Routes');
    ReactDOM.render(renderApp(<Routes history={history} />), rootEl);
  });
}
