import React from 'react';

/**
 * ButtonLabel
 */

export const ButtonLabel = props => {
  return (
    <span className="e-button__label">{props.children}</span>
  );
};

/**
 * Button
 */

const Button = props => {
  const attr = {
    className: 'e-button'
  };
  if (props.bg1) {
    attr.className += ' e-button--bg1';
  }
  if (props.bg2) {
    attr.className += ' e-button--bg2';
  }
  if (props.shadow) {
    attr.className += ' e-button--shadow';
  }
  const label = <ButtonLabel>{props.text}</ButtonLabel>;
  let button;
  if (props.submit) {
    button = <button type="submit" {...attr}>{label}</button>;
  } else {
    button = <a href={props.href} {...attr}>{label}</a>;
  }
  return button;
};

// Button.propTypes = {
//   text: PropTypes.string.isRequired,
//   href: PropTypes.string,
//   submit: PropTypes.bool,
//   bg1: PropTypes.bool,
//   bg2: PropTypes.bool,
//   shadow: PropTypes.bool
// };

Button.defaultProps = {
  text: 'Button'
};

export default Button;
