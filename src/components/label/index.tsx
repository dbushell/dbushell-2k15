import React from 'react';

interface LabelProps {
  text: string,
  field?: string
}

const Label: React.SFC<LabelProps> = props => {
  const attr = {
    className: 'e-label',
    htmlFor: props.field
  };
  return (
    <label {...attr}>{props.text}</label>
  );
};

export default Label;
