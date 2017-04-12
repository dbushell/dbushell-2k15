import React from 'react';
import {Block, Bio, Blog, Small} from '../';

const Footer = props => {
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

// Footer.propTypes = {
//   isHirable: PropTypes.bool,
//   blogItems: PropTypes.array
// };

Footer.defaultProps = {
  isHirable: true
};

export default Footer;
