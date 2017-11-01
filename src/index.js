import React from 'react';
import ReactDOM from 'react-dom';
// Metadata and Rules
import rules from 'data/rules';
import data from 'data/data';
// Root component
import Flow from 'components/Flow/Flow';
// Require HTML
import './index.html';
// Require SCSS
import './scss/index.scss';
// Babel Polyfill(ES5)
import 'babel-polyfill';

ReactDOM.render(
  <Flow rules={JSON.parse(rules)} data={data} />,
  document.getElementById('root')
);
