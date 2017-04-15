import React from 'react';

const Post: React.SFC<PostProps> = props => {
  const classList = ['b-post'].concat(props.classList);
  return (
    <div className={classList.join(' ').trim()}>{props.children}</div>
  );
};

export default Post;
