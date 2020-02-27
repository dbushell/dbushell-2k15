import React from 'react';

const placeholder =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg==';

const LazyImage = props => {
  const imgProps = {
    ...props,
    'data-src': props.src,
    'data-srcset': props.srcSet,
    'data-lazy': 'false',
    src: placeholder,
    srcSet: null
  };
  return <img {...imgProps} />;
};

export default LazyImage;
