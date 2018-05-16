import React from 'react';
import LazyImage from '../lazyimage';
import defaults from './defaults.json';

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
        <LazyImage
          src={props.imageSrc}
          srcSet={props.imageSrcset}
          alt={props.imageAlt}
        />
      </div>
      <div className="b-bio__main">
        <h3 itemProp="name">
          <a href={props.href}>{props.title}</a>
        </h3>
        <p itemProp="description">{props.text}</p>
      </div>
    </section>
  );
};

Bio.defaultProps = defaults;

export default Bio;
