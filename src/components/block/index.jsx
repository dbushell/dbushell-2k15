import React from 'react';
// import PropTypes from 'prop-types';

const Block = props => {
  const classList = ['b-block'].concat(props.classList);
  return (
    <div className={classList.join(' ').trim()}>{props.children}</div>
  );
};

// Block.propTypes = {
//   children: PropTypes.node,
//   classList: PropTypes.arrayOf(PropTypes.string)
// };

// Block.defaultProps = {
//   children: null,
//   classList: null
// };

export default Block;
