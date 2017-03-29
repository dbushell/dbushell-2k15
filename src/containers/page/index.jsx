import React, {Component, PropTypes} from 'react';
import ReactDOMServer from 'react-dom/server';
import {renderFooter} from '../../components/footer';
import {renderNav} from '../../components/nav';
import {Block} from '../../components';
import {md2HTML} from '../../build/helpers';

class Page extends Component {
  render() {
    const props = this.props;
    let postBody = (
      <div className="post__body">
        {props.children}
      </div>
    );
    if (props.innerHTML) {
      postBody = <div className="post__body" dangerouslySetInnerHTML={{__html: props.innerHTML}}/>;
    }
    return (
      <main className="main main--page">
        <Block>
          <div className="post">
            <h1 className="main__title">{props.pageHeading}</h1>
            {postBody}
          </div>
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
