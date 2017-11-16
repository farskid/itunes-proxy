import React from 'react';
import classnames from 'classnames';

// Components
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import SearchForm from '../SearchForm/SearchForm';
import LookupForm from '../LookupForm/LookupForm';
import List from '../List/List';

class LayoutTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      activaTab: 'search'
    };

    // Bindings
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(key) {
    this.props.emptyResult();
    this.setState({
      activaTab: key
    });
  }

  render() {
    return (
      <div className="layout-tabs">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activaTab === 'search'
              })}
              onClick={() => this.changeTab('search')}
            >
              Search
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activaTab === 'lookup'
              })}
              onClick={() => this.changeTab('lookup')}
            >
              Lookup
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activaTab}>
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
