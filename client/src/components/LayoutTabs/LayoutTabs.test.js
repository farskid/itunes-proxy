import React from 'react';
import { shallow } from 'enzyme';
import LayoutTabs from './LayoutTabs';

describe('<LayoutTabs />', () => {
  it('should make search tab active by default', () => {
    const layout = shallow(<LayoutTabs />);
    expect(layout.state().activeTab).toEqual('search');
  });
  it('should change tabs on click of each header link', () => {
    const layout = shallow(<LayoutTabs />);
    layout.instance().changeTab('lookup');
    expect(layout.state().activeTab).toEqual('lookup');
  });
});
