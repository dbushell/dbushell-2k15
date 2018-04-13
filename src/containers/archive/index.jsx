import React from 'react';
import Block from '../../components/block';
import Button from '../../components/button';
import Excerpt from '../../components/excerpt';
import Post from '../../components/post';
import Title from '../../components/title';
const Archive = props => {
  const nextButton = props.nextPage ? (
    <Button href={props.nextPage} text="Older" />
  ) : null;
  const prevButton = props.prevPage ? (
    <Button href={props.prevPage} text="Newer" />
  ) : null;
  const pagination =
    nextButton || prevButton ? (
      <div className="b-pagination">
        {nextButton}
        {prevButton}
      </div>
    ) : null;
  const items = [];
  props.excerpts.forEach(item => {
    items.push(<Excerpt key={item.id} {...item} />);
    items.push(<hr key={item.id + '-hr'} />);
  });
  return (
    <Block isMain>
      <Block>
        <Post>
          <Title heading={props.pageHeading} />
          <div className="b-post__body">{items}</div>
          {pagination}
        </Post>
      </Block>
    </Block>
  );
};
Archive.defaultProps = {
  pageHeading: 'Blog'
};
export default Archive;
