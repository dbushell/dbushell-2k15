import React, {PropTypes} from 'react';
import {Block, Star} from '../';

const Hero = props => {
  return (
    <header className="c-hero">
      <Block>
        <div className="c-hero__logo">
          <h1 className="u-vh">{props.heading}</h1>
          <img src="/assets/img/david-bushell.svg" alt="David Bushell"/>
        </div>
        <div className="c-hero__burst"/>
        <div className="c-hero__crane"/>
        <Star id="star" blink/>
        <Star id="burst" blink/>
        <Star id="star" blink/>
      </Block>
      <div className="c-hero__bg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg">
            <path className="st0" d="M3000 600H0V0z"/>
            <path className="st1" d="M-4.5 2.5l3005 601"/>
            <path className="st2" d="M-4.5 9.5l3005 601"/>
          </svg>
        </div>
      </div>
    </header>
  );
};

Hero.propTypes = {
  heading: PropTypes.string
};

Hero.defaultProps = {
  heading: 'David Bushell — Web Design & Front-end Development (based in Manchester, UK)'
};

export default Hero;
