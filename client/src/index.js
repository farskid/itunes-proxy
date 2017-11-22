/* eslint-disable import/first */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// Store
import store from './store';
// Root
import App from './components/App/App';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
// shared styles
import './styles/index.css';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
