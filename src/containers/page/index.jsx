import React, {Component, PropTypes} from 'react';
import ReactDOMServer from 'react-dom/server';
import {renderFooter} from '../../components/footer';
import {renderNav} from '../../components/nav';
import {Block, Post} from '../../components';
import {md2HTML} from '../../build/helpers';

class Page extends Component {
  render() {
    const props = this.props;
    let postBody = (
      <div className="b-post__body">
        {props.children}
      </div>
    );
    if (props.innerHTML) {
      postBody = <div className="b-post__body" dangerouslySetInnerHTML={{__html: props.innerHTML}}/>;
    }
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
  }
  static getHTML(file) {
    return md2HTML(file);
  }
  static renderBody(el) {
    return `
${ReactDOMServer.renderToStaticMarkup(el)}
${renderFooter()}
${renderNav()}
`;
  }
}

Page.propTypes = {
  pageHeading: PropTypes.string,
  innerHTML: PropTypes.string,
  children: PropTypes.node
};

Page.defaultProps = {
  pageHeading: 'Page'
};

export default Page;
