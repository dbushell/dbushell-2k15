import React from 'react';
const ButtonLabel = props => {
  return <span className="e-button__label">{props.text}</span>;
};
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
  const label = <ButtonLabel text={props.text} />;
  let button;
  if (props.submit) {
    button = <button type="submit" {...attr}>{label}</button>;
  } else {
    button = <a href={props.href} {...attr}>{label}</a>;
  }
  return button;
};
Button.defaultProps = {
  text: 'Button'
};
export default Button;
