import React from 'react';
import Block from '../block';
import Bio from '../bio';
import Blog from '../blog';
import Small from '../small';

const Footer: React.SFC<FooterProps> = props => {
  const attr = {
    id: 'footer',
    className: 'c-footer u-dim'
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
        <Blog/>
        <hr/>
        <Small>Copyright &copy; {(new Date()).getFullYear()} <a href="/">David Bushell</a></Small>
      </Block>
    </footer>
  );
};

Footer.defaultProps = {
  isHirable: true
};

export default Footer;
