import React from 'react';
import { shallow } from 'enzyme';
import Component from './Date';

describe('<Date />', () => {
  it('will format the input date string', () => {
    const date = shallow(
      <Component dateString="2017-11-03" format="D MMMM, YY" />
    );
    expect(date.props().children).toBe('3 November, 17');
  });

  it('should render an element with classname `date`', () => {
    const date = shallow(
      <Component dateString="2017-11-03" format="DD MM, YYYY" />
    );
    expect(date.hasClass('date')).toBe(true);
  });
});
