/* eslint-disable */
import raf from './raf-polyfill';
import React from 'react';
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Make React global to all tests
global.React = React;

// Make enzyme methods available globally in all tests without importing them
global.shallow = shallow;
global.mount = mount;
global.render = render;

// Setup enzyme adapter to work properly with React 16
configure({
  adapter: new Adapter()
});
