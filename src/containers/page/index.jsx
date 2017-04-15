import React from 'react';
import {Block, Post} from '../../components';

const Page = props => {
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

// Page.propTypes = {
//   pageHeading: PropTypes.string,
//   innerHTML: PropTypes.string,
//   children: PropTypes.node
// };

Page.defaultProps = {
  pageHeading: 'Page'
};

export default Page;
