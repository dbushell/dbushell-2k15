import React from 'react';

interface FieldProps {
  id: string,
  name?: string,
  type?: string,
  value?: string,
  placeholder?: string,
  required?: boolean
}

const Field: React.SFC<FieldProps> = props => {
  const attr = {
    className: 'e-field'
  };
  return (
    <input {...attr} {...props}/>
  );
};

Field.defaultProps = {
  id: 'field',
  required: true
};

export default Field;
