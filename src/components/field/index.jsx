import React from 'react';
// import PropTypes from 'prop-types';

const Field = props => {
  const attr = {
    className: 'e-field'
  };
  return (
    <input {...attr} {...props}/>
  );
};

// Field.propTypes = {
//   id: PropTypes.string,
//   type: PropTypes.string,
//   value: PropTypes.string,
//   placeholder: PropTypes.string,
//   required: PropTypes.bool
// };

Field.defaultProps = {
  id: 'field',
  type: 'text',
  value: '',
  placeholder: '',
  required: true
};

export default Field;
