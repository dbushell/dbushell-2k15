import React from 'react';
import PropTypes from 'prop-types';
import container from '../';
import {Block, Post} from '../../components';

const Page = props => {
  const postBody = props.innerHTML ?
    <div className="b-post__body" dangerouslySetInnerHTML={{__html: props.innerHTML}}/> :
    <div className="b-post__body">{props.children}</div>;
  return (
    <main className="c-main">
      <Block>
        <Post>
          <div className="b-post__title">
            <h1>{props.pageHeading}</h1>
          </div>
          {postBody}
        </Post>
      </Block>
    </main>
  );
};

Page.propTypes = {
  pageHeading: PropTypes.string,
  innerHTML: PropTypes.string,
  children: PropTypes.node
};

Page.defaultProps = {
  pageHeading: 'Page',
  innerHTML: '',
  children: null
};

export default container(Page);
