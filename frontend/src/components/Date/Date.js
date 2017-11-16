import React from 'react';
import moment from 'moment';

const Date = ({ dateString, format }) => {
  return <span className="date">{moment(dateString).format(format)}</span>;
};

export default Date;
