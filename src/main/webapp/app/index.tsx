import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppComponent from './app';
import initStore from './config/store';
const rootEl = document.getElementById('root');

const store = initStore();

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    rootEl
  );

render(AppComponent);
