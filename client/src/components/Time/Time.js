import React from 'react';
import PropTypes from 'prop-types';

// Utils
import leadingZero from '../../utils/leadingZero';

const Time = ({ milliseconds, divider }) => {
  if (!milliseconds) {
    return null;
  }

  const secs = milliseconds / 1000;
  const hours = Math.floor(secs / 3600);
  const HOURS_DIVISION = secs % 3600;
  const minutes = Math.floor(HOURS_DIVISION / 60);
  const MINUTES_DIVISION = HOURS_DIVISION % 60;
  const seconds = Math.ceil(MINUTES_DIVISION);

  const timeArray = [hours, minutes, seconds].map(time => leadingZero(time));

  return <span className="time">{timeArray.join(divider)}</span>;
};

Time.propTypes = {
  divider: PropTypes.string,
  milliseconds: PropTypes.number
};

Time.defaultProps = {
  divider: ':',
  milliseconds: 0
};

export default Time;
