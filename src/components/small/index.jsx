import React, {PropTypes} from 'react';

const Small = props => {
  return (
    <p><small>{props.children}</small></p>
  );
};

Small.propTypes = {
  children: PropTypes.node
};

export default Small;
