import React from 'react';
import prepareRules from 'engine/prepare-rules';
import runRules from 'engine/run-rules';

/**
 * @function withEngine
 * @description Adds engine methods as a prop to React components
 * @param {class} Component
 */
function withEngine(Component) {
  return function withEngineComponent(props) {
    return (
      <Component prepareRules={prepareRules} runRules={runRules} {...props} />
    );
  };
}

export default withEngine;
