import React from 'react';
import Button from '../button';
import defaults from './defaults.json';
const Cta = props => {
  const paragraph = () => ({
    __html: props.paragraph
  });
  return (
    <div className="b-boxed b-boxed--dark u-dark">
      <h3>{props.title}</h3>
      <p dangerouslySetInnerHTML={paragraph()} />
      <Button bg1 href={props.href} text={props.link} />
    </div>
  );
};
Cta.defaultProps = defaults;
export default Cta;
