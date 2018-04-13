import React from 'react';
import Block from '../../components/block';
import Post from '../../components/post';
import Title from '../../components/title';
const Page = props => {
  const postBody = props.innerHTML ? (
    <div
      className="b-post__body"
      dangerouslySetInnerHTML={{__html: props.innerHTML}}
    />
  ) : (
    <div className="b-post__body">{props.children}</div>
  );
  return (
    <Block isMain>
      <Block>
        <Post>
          <Title heading={props.pageHeading} />
          {postBody}
        </Post>
      </Block>
    </Block>
  );
};
Page.defaultProps = {
  pageHeading: 'Page'
};
export default Page;
