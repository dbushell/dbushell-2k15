import React from 'react';
import Block from '../../components/block';
import Post from '../../components/post';

const Page: React.SFC<any> = props => {
  const postBody = props.innerHTML ?
    <div className="b-post__body" dangerouslySetInnerHTML={{__html: props.innerHTML}}/> :
    <div className="b-post__body">{props.children}</div>;
  return (
    <Block isMain>
      <Block>
        <Post>
          <div className="b-post__title">
            <h1>{props.pageHeading}</h1>
          </div>
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
