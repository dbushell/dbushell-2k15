import React from 'react';
const Field = props => {
  const attr = {
    className: 'e-field'
  };
  return <input {...attr} {...props} />;
};
Field.defaultProps = {
  id: 'field',
  required: true
};
export default Field;
