import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import {renderFooter} from '../components/footer';
import {renderNav} from '../components/nav';

function createContainer(Contained, config = {}) {
  class Container extends Component {
    render() {
      return <Contained {...this.props}/>;
    }
    static renderBody(el) {
      const footerFn = typeof config.renderFooter === 'function' ?
        config.renderFooter : renderFooter;
      const navFn = typeof config.renderNav === 'function' ?
        config.renderNav : renderNav;
      return `
${ReactDOMServer.renderToStaticMarkup(el)}
${footerFn()}
${navFn()}
`;
    }
  }

  Container.displayName = Contained.displayName || Contained.name || 'Component';
  Container.propTypes = Contained.propTypes;
  Container.defaultProps = Contained.defaultProps;

  return Container;
}

export default createContainer;
