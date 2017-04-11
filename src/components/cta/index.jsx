import React from 'react';
// import PropTypes from 'prop-types';
import {Button} from '../../components';

const Cta = props => {
  const paragraph = () => ({
    __html: props.paragraph
  });
  return (
    <div className="b-boxed b-boxed--dark u-dark">
      <h3>{props.title}</h3>
      <p dangerouslySetInnerHTML={paragraph()}/>
      <Button bg1 href={props.href} text={props.link}/>
    </div>
  );
};

// Cta.propTypes = {
//   title: PropTypes.string,
//   paragraph: PropTypes.string,
//   link: PropTypes.string,
//   href: PropTypes.string
// };

Cta.defaultProps = {
  title: 'Get a free quote…',
  paragraph: 'Interested in working with me? <a href="/contact/">Send me an email</a> with your requirements and I’ll happily provide a free quote and let you know my availability.',
  link: 'Get in touch',
  href: '/contact/'
};

export default Cta;

