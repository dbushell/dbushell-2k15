import React, {PropTypes} from 'react';
import {Button, Star} from '../';

const Sector = props => {
  const attr = {
    className: 'b-sector'
  };
  const buttonAttr = {
    ...props.button,
    bg1: !props.alt,
    bg2: props.alt,
    shadow: true
  };
  if (props.rtl) {
    attr.className += ' b-sector--rtl';
  }
  attr.className += props.alt ? ' u-dark-alt' : ' u-dark';
  const starId = props.alt ? 'right' : 'left';
  return (
    <article {...attr}>
      <Star id={starId}/>
      <div className="b-sector__header">
        <h2 className="u-bright">{props.heading}</h2>
        <p className="p--large u-dim">{props.subheading}</p>
      </div>
      <div className="b-sector__main">
        <p>{props.description}</p>
      </div>
      <Button {...buttonAttr}/>
    </article>
  );
};

Sector.propTypes = {
  alt: PropTypes.bool,
  rtl: PropTypes.bool,
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  button: PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string
  })
};

Sector.defaultProps = {
  alt: false,
  rtl: false,
  heading: 'heading',
  subheading: 'subheading',
  description: 'desc',
  button: {
    text: 'Button',
    href: '#'
  }
};

export default Sector;
