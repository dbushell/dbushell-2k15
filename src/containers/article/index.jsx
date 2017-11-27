import React from 'react';
import Block from '../../components/block';
import Cta from '../../components/cta';
import Time from '../../components/time';
import Newsletter from '../../components/newsletter';
import Post from '../../components/post';
import {formatHeading} from '../../build/utils';
const Article = props => {
  const title = () => {
    return {__html: formatHeading(props.pageHeading)};
  };
  const body = () => {
    return {__html: props.innerHTML};
  };
  const date = () => {
    if (!props.pageUndated) {
      return (
        <p className="b-post__date">
          <Time date={props.dateUnix} />
        </p>
      );
    }
  };
  const ctaProps = {
    title: 'More from me…',
    link: 'Why not hire me!',
    paragraph:
      '<a href="/blog/">Read more on my blog</a> and follow <a rel="me noopener noreferrer" target="_blank" href="http://twitter.com/dbushell" title="David Bushell on Twitter">@dbushell</a>. If you like what I do:'
  };
  return (
    <Block isMain>
      <Block>
        <Post>
          <h1 className="b-post__title" dangerouslySetInnerHTML={title()} />
          {date()}
          <div className="b-post__body" dangerouslySetInnerHTML={body()} />
        </Post>
        <hr />
        <Cta {...ctaProps} />
        <Newsletter />
      </Block>
    </Block>
  );
};
Article.defaultProps = {
  pageHeading: 'Untitled',
  dateUnix: Date.now()
};
export default Article;
