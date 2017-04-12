import React from 'react';

const Block = props => {
  if (props.main) {
    return (
      <main className={['c-main'].concat(props.classList).join(' ').trim()}>{props.children}</main>
    );
  }
  return (
    <div className={['b-block'].concat(props.classList).join(' ').trim()}>{props.children}</div>
  );
};

// Block.propTypes = {
//   children: PropTypes.node,
//   classList: PropTypes.arrayOf(PropTypes.string)
// };

export default Block;
