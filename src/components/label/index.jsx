import React, {PropTypes} from 'react';

const Label = props => {
  const attr = {
    className: 'e-label',
    htmlFor: props.field
  };
  return (
    <label {...attr}>{props.text}</label>
  );
};

Label.propTypes = {
  text: PropTypes.string.isRequired,
  field: PropTypes.string
};

export default Label;
