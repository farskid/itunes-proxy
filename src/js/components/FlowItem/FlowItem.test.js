import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import FlowItem from './FlowItem';

let suite = {};

beforeAll(() => {
  suite.ruleMock = {
    id: 0,
    name: 'increment',
    ruleBody: new Function('return arguments[0].total += arguments[0].incrementer'),
    passed: true,
    true_id: 2,
    false_id: null
  };
});

afterAll(() => {
  suite = null;
});

describe('<FlowItem />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FlowItem rule={suite.ruleMock} />, div);
  });

  it('passes the props validation', () => {
    const wrapper = mount(<FlowItem rule={suite.ruleMock} />);

    expect(wrapper.props()).not.toBe(undefined);
    expect(typeof wrapper.props().rule).toBe('object');
    expect(typeof wrapper.props().rule.id).not.toBe(undefined);
  });

  it('toggles collapse on click', () => {
    const wrapper = shallow(<FlowItem rule={suite.ruleMock} />);

    // By default, state.collapsed is false
    expect(wrapper.state().collapsed).toBe(false);
    expect(wrapper.hasClass('card--collapsed')).toBe(false);

    // When clicked on header element, state.collapsed toggles to true
    wrapper.find('header').simulate('click');
    expect(wrapper.state().collapsed).toBe(true);
    expect(wrapper.hasClass('card--collapsed')).toBe(true);

    // When clicked again on header element, state.collapsed toggles to false
    wrapper.find('header').simulate('click');
    expect(wrapper.state().collapsed).toBe(false);
  });

  it('should has a background color className relevant to it`s passed property', () => {
    const wrapper = shallow(<FlowItem rule={suite.ruleMock} />);

    expect(wrapper.find('header').hasClass('bg--success')).toBe(true);
  });
});
