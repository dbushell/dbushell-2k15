import React from 'react';
import PropTypes from 'prop-types';

const Bio = props => {
  const attr = {
    className: 'b-bio',
    role: 'complementary',
    itemScope: true,
    itemType: 'http://schema.org/Person'
  };
  return (
    <section {...attr}>
      <div className="b-bio__image">
        <img src={props.imageSrc} srcSet={props.imageSrcset} alt={props.imageAlt}/>
      </div>
      <div className="b-bio__main">
        <h3 itemProp="name"><a href={props.href}>{props.title}</a></h3>
        <p itemProp="description">{props.text}</p>
      </div>
    </section>
  );
};

Bio.propTypes = {
  imageSrc: PropTypes.string,
  imageSrcset: PropTypes.string,
  imageAlt: PropTypes.string,
  title: PropTypes.string,
  href: PropTypes.string,
  text: PropTypes.string
};

Bio.defaultProps = require('./defaults');

export default Bio;
