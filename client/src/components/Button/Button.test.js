import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('<Button />', () => {
  it('renders a bootstrap button and defaults to secondary button', () => {
    const button = shallow(<Button>Button</Button>);
    expect(button.html()).toBe(
      '<button class="btn btn-secondary">Button</button>'
    );
  });

  it('disabled on loading state', () => {
    const button = shallow(<Button loading>Button</Button>);
    expect(button.hasClass('disabled')).toBe(true);
    expect(button.props().disabled).toBe(true);
    expect(button.is('[disabled]')).toBe(true);
  });
});
