import React from 'react';

const Small: React.SFC<SmallProps> = props => {
  return (
    <p><small>{props.children}</small></p>
  );
};

export default Small;
