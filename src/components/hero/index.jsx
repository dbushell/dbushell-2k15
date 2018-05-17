import React from 'react';
import Block from '../block';
import Star from '../star';
import defaults from './defaults';

const Hero = props => {
  return (
    <header className="c-hero">
      <Block>
        <div className="c-hero__logo">
          <h1 className="u-vh">{props.heading}</h1>
          <img src="/assets/img/david-bushell.svg" alt="David Bushell" />
        </div>
        <div className="c-hero__burst" />
        <div className="c-hero__crane" />
        <Star blink id="star" />
        <Star blink id="burst" />
        <Star blink id="star" />
      </Block>
      <div className="c-hero__bg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg">
            <path className="st0" d="M3000 600H0V0z" />
            <path className="st1" d="M-4.5 2.5l3005 601" />
            <path className="st2" d="M-4.5 9.5l3005 601" />
          </svg>
        </div>
      </div>
    </header>
  );
};

Hero.defaultProps = defaults;

export default Hero;
