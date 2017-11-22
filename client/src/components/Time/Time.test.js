import React from 'react';
import { shallow } from 'enzyme';
import Time from './Time';

describe('<List />', () => {
  it('should convert milliseconds to formated string', () => {
    const time = shallow(<Time milliseconds={3600000} />);
    expect(time.props().children).toBe('01:00:00');
  });

  it('should wrap the it in an element of className `time`', () => {
    const time = shallow(<Time milliseconds={3600000} />);
    expect(time.hasClass('time')).toBe(true);
  });

  it('should accept custom divider', () => {
    const time = shallow(<Time milliseconds={3600000} divider="/" />);
    expect(time.props().children).toBe('01/00/00');
  });
});
