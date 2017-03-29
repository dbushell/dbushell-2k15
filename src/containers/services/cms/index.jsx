import path from 'path';
import React, {Component, PropTypes} from 'react';
import ReactDOMServer from 'react-dom/server';
import {renderFooter} from '../../../components/footer';
import {renderNav} from '../../../components/nav';
import {Block, Cta} from '../../../components';
import {md2HTML} from '../../../build/helpers';

const content = md2HTML(path.join(__dirname, 'content.md'));

class Service extends Component {
  render() {
    const props = this.props;
    return (
      <main className="main main--service">
        <Block classList={['post']}>
          <h1 className="main__title">{props.pageHeading}</h1>
          <div className="post__body" dangerouslySetInnerHTML={{__html: content}}/>
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

Service.propTypes = {
  pageHeading: PropTypes.string
};

Service.defaultProps = {
  pageHeading: 'WordPress & CMS'
};

export default Service;
