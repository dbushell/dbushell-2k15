import path from 'path';
import React, {Component, PropTypes} from 'react';
import ReactDOMServer from 'react-dom/server';
import {renderFooter} from '../../components/footer';
import {renderNav} from '../../components/nav';
import {Block, Cta, Post} from '../../components';
import {md2HTML} from '../../build/helpers';

class Services extends Component {
  render() {
    const props = this.props;
    return (
      <main className="c-main">
        <Block>
          <Post>
            <div className="b-post__title">
              <h1>{props.pageHeading}</h1>
            </div>
            <div className="b-post__body" dangerouslySetInnerHTML={{__html: props.content}}/>
          </Post>
          <Cta/>
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

Services.propTypes = {
  pageHeading: PropTypes.string,
  content: PropTypes.string
};

Services.defaultProps = {
  pageHeading: 'Services',
  content: md2HTML(path.join(__dirname, 'content.md'))
};

export default Services;
