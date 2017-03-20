import React, {PropTypes} from 'react';

// temporary old markup
const Smallcopy = props => {
  return (
    <p className="p--small">
      <small>{props.children}</small>
    </p>
  );
};

Smallcopy.propTypes = {
  children: PropTypes.node
};

export default Smallcopy;
