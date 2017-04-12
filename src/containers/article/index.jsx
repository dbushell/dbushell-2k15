import React from 'react';
import container from '../';
import {Block, Cta, Time, Newsletter, Post} from '../../components';

// https://github.com/wycats/handlebars.js/blob/7535e48a7969229f44489124a8ef07bd17363f06/lib/handlebars/utils.js
const escChars = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};
const esc = str => str.replace(/[&<>"'`=]/g, chr => escChars[chr]);

function format(title) {
  const words = title.split(' ');
  if (words.length > 3 && words[words.length - 1].length < 9) {
    const pos = title.lastIndexOf(' ');
    title = esc(title.substr(0, pos)) + '<span class="nbsp">&nbsp;</span>' + esc(title.substr(pos + 1));
  } else {
    title = esc(title);
  }
  return title;
}

const Article = props => {
  const title = () => {
    return {__html: format(props.pageHeading)};
  };
  const body = () => {
    return {__html: props.html};
  };
  const date = () => {
    if (!props.portfolio) {
      return (
        <p className="b-post__date">
          <Time date={props.dateUnix}/>
        </p>
      );
    }
  };
  const ctaProps = {
    title: 'More from me…',
    link: 'Why not hire me!',
    paragraph: '<a href="/blog/">Read more on my blog</a> and follow <a rel="me noopener noreferrer" target="_blank" href="http://twitter.com/dbushell" title="David Bushell on Twitter">@dbushell</a>. If you like what I do:'
  };
  return (
    <main className="c-main">
      <Block>
        <Post>
          <h1 className="b-post__title" dangerouslySetInnerHTML={title()}/>
          {date()}
          <div className="b-post__body" dangerouslySetInnerHTML={body()}/>
        </Post>
        <hr/>
        <Cta {...ctaProps}/>
        <Newsletter/>
      </Block>
    </main>
  );
};

// Article.propTypes = {
//   dateUnix: PropTypes.number,
//   pageHeading: PropTypes.string,
//   html: PropTypes.string,
//   portfolio: PropTypes.bool
// };

Article.defaultProps = {
  pageHeading: 'Untitled',
  dateUnix: Date.now()
};

export default container(Article);
