import React from 'react';
import Block from '../block';
import Bio from '../bio';
import Blog from '../blog';
import Small from '../small';
import blogDefaults from '../blog/defaults.json';
// Read props live for static site generation to avoid require cache
function blogProps() {
  if (process.env.NODE_ENV !== 'production') {
    try {
      const fs = require('fs');
      const path = require('path');
      const propsPath = path.join(
        process.cwd(),
        'src/components/blog/defaults.json'
      );
      const props = JSON.parse(fs.readFileSync(propsPath, 'utf8'));
      return props;
    } catch (err) {
      console.log(err);
    }
  }
  return blogDefaults;
}
const Footer = props => {
  const attr = {
    id: 'footer',
    className: 'c-footer u-dim'
  };
  const hire = (
    <a href="/contact/" className="b-hire">
      <img
        className="b-hire__image"
        src="/assets/img/dbushell-for-hire.svg"
        alt="Available for Hire"
      />
    </a>
  );
  return (
    <footer {...attr}>
      <Block>
        <Bio />
        {props.isHirable ? hire : <hr />}
        <Blog {...blogProps()} />
        <hr />
        <Small>
          Copyright &copy; {new Date().getFullYear()}{' '}
          <a href="/">David Bushell</a>
        </Small>
      </Block>
    </footer>
  );
};
Footer.defaultProps = {
  isHirable: true
};
export default Footer;
