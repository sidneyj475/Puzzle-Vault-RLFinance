import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const Button = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`btn ${props.className}`}
      style={{backgroundColor: props.backgroundColor, margin: props.margin}}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default Button;
