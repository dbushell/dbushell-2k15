import React from 'react';

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

export default Block;
