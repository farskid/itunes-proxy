import React from 'react';
import logger from 'js/log';

/**
 * @function withLogger
 * @description Adds logger as a prop to React components
 * @param {class} Component
 */
function withLogger(Component) {
  return function withLoggerComponent(props) {
    return <Component logger={logger} {...props} />;
  };
}

export default withLogger;
