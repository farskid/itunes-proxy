import React from 'react';
import { shallow } from 'enzyme';
import List from './List';

describe('<List />', () => {
  it('should return nothing when no items provided', () => {
    const list = shallow(<List items={null} />);
    expect(list.html()).toBe(null);
  });

  it('should should show loading text when in loading state', () => {
    const list = shallow(<List items={[]} loading loadingText="Loading..." />);
    expect(list.html()).toBe('<p class="list-indicator">Loading...</p>');
  });

  it('should show empty text when list is empty', () => {
    const list = shallow(<List items={[]} emptyText="List is empty" />);
    expect(list.html()).toBe('<p class="list-indicator">List is empty</p>');
  });
});
