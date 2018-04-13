import React from 'react';
import {formatHeading} from '../../build/utils';

const Title = props => {
  const title = () => ({__html: formatHeading(props.heading)});
  return (
    <h1 className="b-post__title" dangerouslySetInnerHTML={title()} />
  );
};

export default Title;
