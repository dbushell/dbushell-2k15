import fs from 'fs';
import path from 'path';
import React, {PropTypes} from 'react';
import ReactDOMServer from 'react-dom/server';
import {Block, Bio, Blog, Small} from '../';

const Footer = props => {
  const attr = {
    id: 'footer',
    className: 'c-footer'
  };
  const hire = (
    <a href="/contact/" className="b-hire">
      <img className="b-hire__image" src="/assets/img/dbushell-for-hire.svg" alt="Available for Hire"/>
    </a>
  );
  return (
    <footer {...attr}>
      <Block>
        <Bio/>
        {props.isHirable ? hire : <hr/>}
        <Blog items={props.blogItems}/>
        <hr/>
        <Small>Copyright &copy; {(new Date()).getFullYear()} <a href="/">David Bushell</a></Small>
      </Block>
    </footer>
  );
};

Footer.propTypes = {
  isHirable: PropTypes.bool,
  blogItems: PropTypes.array
};

Footer.defaultProps = {
  isHirable: true
};

export default Footer;

let blogDefaults = null;

export function renderFooter(props = {}) {
  try {
    blogDefaults = blogDefaults || fs.readFileSync(path.join(process.cwd(), '/src/components/blog/defaults.json'), 'utf8');
    props.blogItems = JSON.parse(blogDefaults).items;
  } catch (err) {}
  return ReactDOMServer.renderToStaticMarkup(<Footer {...props}/>);
}
