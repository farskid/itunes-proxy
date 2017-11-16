import React from 'react';
import PropTypes from 'prop-types';
import { Button as BTN } from 'reactstrap';

function Button(props) {
  const { loading, loadingContent, children, disabled, ...rest } = props;
  return (
    <BTN
      {...rest}
      className={loading ? 'disabled' : ''}
      disabled={loading || disabled}
    >
      {loading && loadingContent}
      {!loading && children}
    </BTN>
  );
}

export default Button;

Button.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  loadingContent: PropTypes.any,
  children: PropTypes.any
};
Button.defaultProps = {
  loading: false,
  disabled: false,
  loadingContent: null,
  children: null
};
