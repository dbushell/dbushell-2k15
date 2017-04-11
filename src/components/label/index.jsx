import React from 'react';
// import PropTypes from 'prop-types';

const Label = props => {
  const attr = {
    className: 'e-label',
    htmlFor: props.field
  };
  return (
    <label {...attr}>{props.text}</label>
  );
};

// Label.propTypes = {
//   text: PropTypes.string.isRequired,
//   field: PropTypes.string
// };

// Label.defaultProps = {
//   field: 'field'
// };

export default Label;
