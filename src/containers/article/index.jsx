import React, {Component, PropTypes} from 'react';
import ReactDOMServer from 'react-dom/server';
import {formatTitle} from '../../build/helpers';
import {renderFooter} from '../../components/footer';
import {renderNav} from '../../components/nav';
import {Block, Cta, Time, Newsletter, Post} from '../../components';

class Article extends Component {
  render() {
    const props = this.props;
    const title = () => {
      return {__html: formatTitle(props.pageHeading)};
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
  }

  static renderBody(el) {
    return `
${ReactDOMServer.renderToStaticMarkup(el)}
${renderFooter()}
${renderNav()}
`;
  }
}

Article.propTypes = {
  dateUnix: PropTypes.number,
  pageHeading: PropTypes.string,
  html: PropTypes.string,
  portfolio: PropTypes.bool
};

Article.defaultProps = {
  pageHeading: 'Untitled',
  dateUnix: Date.now(),
  html: 'End of file.',
  portfolio: false
};

export default Article;
