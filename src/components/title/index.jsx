import React from 'react';
import {formatHeading} from '../../build/utils';

const Title = props => {
  const title = () => ({__html: formatHeading(props.heading)});
  return <h1 dangerouslySetInnerHTML={title()} className="b-post__title" />;
};

export default Title;
