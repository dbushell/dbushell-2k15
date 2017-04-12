import React from 'react';
import {Button} from '../../components';
import defaults from './defaults';

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

Cta.defaultProps = defaults;

export default Cta;

