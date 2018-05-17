import React from 'react';

const Post = props => {
  const classList = ['b-post'].concat(props.classList);
  return <div className={classList.join(' ').trim()}>{props.children}</div>;
};

export default Post;
