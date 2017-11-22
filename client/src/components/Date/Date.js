import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const Date = ({ dateString, format }) => (
  <span className="date">{moment(dateString).format(format)}</span>
);

export default Date;

Date.propTypes = {
  dateString: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired
};
