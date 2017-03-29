import React, {PropTypes} from 'react';

const Post = props => {
  const classList = ['b-post'].concat(props.classList);
  return (
    <div className={classList.join(' ').trim()}>{props.children}</div>
  );
};

Post.propTypes = {
  children: PropTypes.node,
  classList: PropTypes.arrayOf(PropTypes.string)
};

export default Post;
