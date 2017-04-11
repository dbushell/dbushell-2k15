import React from 'react';
import PropTypes from 'prop-types';

const Small = props => {
  return (
    <p><small>{props.children}</small></p>
  );
};

Small.propTypes = {
  children: PropTypes.node
};

Small.defaultProps = {
  children: null
};

export default Small;
