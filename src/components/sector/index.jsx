import React, {PropTypes} from 'react';
import {Button} from '../';

const Sector = props => {
  const attr = {
    className: 'b-sector'
  };
  const star = id => {
    return {__html: `<use xlink:href="/assets/img/stars.svg#${id}"></use>`};
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
      <svg className="b-sector__star" role="presentation" dangerouslySetInnerHTML={star(starId)}/>
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
  heading: PropTypes.string,
  subheading: PropTypes.string,
  description: PropTypes.string,
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


