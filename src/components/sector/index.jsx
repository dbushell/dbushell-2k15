import React from 'react';
import Button from '../button';
import Star from '../star';

const Sector = props => {
  const attr = {
    className: 'b-sector'
  };
  const buttonAttr = Object.assign({}, props.button, {
    bg1: !props.alt,
    bg2: props.alt,
    shadow: true
  });
  if (props.rtl) {
    attr.className += ' b-sector--rtl';
  }
  attr.className += props.alt ? ' u-dark-alt' : ' u-dark';
  const starId = props.alt ? 'right' : 'left';
  return (
    <article {...attr}>
      <Star id={starId} />
      <div className="b-sector__header">
        <h2 className="u-bright">{props.heading}</h2>
        <p className="p--large u-dim">{props.subheading}</p>
      </div>
      <div className="b-sector__main">
        <p>{props.description}</p>
      </div>
      <Button {...buttonAttr} />
    </article>
  );
};

export default Sector;
