import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import Footer from '../components/footer';
import Nav from '../components/nav';

function container(Contained, config = {}) {
  class Container extends Component {
    render() {
      return <Contained {...this.props} />;
    }
    static renderBody(el) {
      const footerProps = {...(config.footerProps || {})};
      const navProps = {...(config.navProps || {})};
      return `
${ReactDOMServer.renderToStaticMarkup(el)}
${ReactDOMServer.renderToStaticMarkup(<Footer {...footerProps} />)}
${ReactDOMServer.renderToStaticMarkup(<Nav {...navProps} />)}
`;
    }
  }

  Container.displayName =
    (Contained.displayName || Contained.name || 'Component') + 'Container';
  Container.defaultProps = Contained.defaultProps;
  Container.propTypes = Contained.propTypes;

  return Container;
}

export default container;
