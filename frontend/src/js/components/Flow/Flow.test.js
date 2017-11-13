import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Flow from './Flow';
import data from 'data/data';

let suite = {};

beforeAll(() => {
  suite.rulesMock = JSON.stringify([
    {
      id: 0,
      name: 'increment',
      ruleBody: 'return arguments[0].total += arguments[0].incrementer',
      true_id: 2,
      false_id: null
    },
    {
      id: 1,
      name: 'modulo',
      ruleBody: 'return arguments[0].total % arguments[0].modulo',
      true_id: null,
      false_id: 3
    },
    {
      id: 2,
      name: 'increment',
      ruleBody: 'return true',
      true_id: null,
      false_id: null
    }
  ]);
  suite.dataMock = data;
});

afterAll(() => {
  suite = null;
});

describe('<Flow />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Flow rules={JSON.parse(suite.rulesMock)} data={suite.dataMock} />,
      div
    );
  });

  it('passes the props validation', () => {
    const wrapper = shallow(
      <Flow rules={JSON.parse(suite.rulesMock)} data={suite.dataMock} />
    );
    expect(wrapper.props()).not.toBe(undefined);
    expect(Array.isArray(wrapper.props().rules)).toBe(true);
  });
});
