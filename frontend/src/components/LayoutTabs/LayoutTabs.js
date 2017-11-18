import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import SearchForm from '../SearchForm/SearchForm';
import LookupForm from '../LookupForm/LookupForm';

class LayoutTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      activeTab: 'search'
    };

    // Bindings
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(key) {
    this.props.emptyResult();
    this.setState({
      activeTab: key
    });
  }

  render() {
    return (
      <div className="layout-tabs">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === 'search'
              })}
              onClick={() => this.changeTab('search')}
            >
              Search
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === 'lookup'
              })}
              onClick={() => this.changeTab('lookup')}
            >
              Lookup
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="search">
            <SearchForm
              loading={this.props.loading}
              search={this.props.search}
              changeTab={this.changeTab}
              items={this.props.searchList}
            />
          </TabPane>
          <TabPane tabId="lookup">
            <LookupForm
              loading={this.props.loading}
              lookup={this.props.lookup}
              changeTab={this.changeTab}
              items={this.props.searchList}
            />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default LayoutTabs;

LayoutTabs.propTypes = {
  loading: PropTypes.bool,
  search: PropTypes.func,
  lookup: PropTypes.func,
  searchList: PropTypes.array,
  emptyResult: PropTypes.func
};

LayoutTabs.defaultProps = {
  loading: false,
  search: () => {},
  lookup: () => {},
  searchList: [],
  emptyResult: () => {}
};
