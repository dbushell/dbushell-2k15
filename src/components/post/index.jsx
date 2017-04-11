import React from 'react';
import PropTypes from 'prop-types';

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

Post.defaultProps = {
  children: null,
  classList: ['']
};

export default Post;
