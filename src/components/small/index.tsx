import React from 'react';

interface SmallProps {
  children: any
}

const Small: React.SFC<SmallProps> = props => {
  return (
    <p><small>{props.children}</small></p>
  );
};

export default Small;
