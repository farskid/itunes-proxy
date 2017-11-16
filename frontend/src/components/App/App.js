import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import LayoutTabs from '../LayoutTabs/LayoutTabs';
import Notification from '../Notification/Notification';

// Actions
import { search, lookup, emptyResult } from '../../actions';

const App = props => (
  <div className="container">
    <h3 className="app-title">Search through Itunes</h3>
    <LayoutTabs {...props} />
    <Notification />
  </div>
);

const mapStateToProps = state => {
  const { loading } = state.loading;
  const { searchCount, searchList } = state.data;
  return { loading, searchCount, searchList };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      search,
      lookup,
      emptyResult
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
