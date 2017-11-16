import React from 'react';

const Conditional = Component => {
  return function withConditional({ condition, ...restProps }) {
    if (condition) {
      return <Component {...restProps} />;
    }
    return null;
  };
};

export default Conditional;
