import React from 'react';
import Time from '../time';

const Excerpt: React.SFC<ExcerptProps> = props => {
  const attr = {
    className: 'b-post b-post--excerpt'
  };
  const body = () => {
    return {__html: props.body};
  };
  return (
    <article {...attr}>
      <h3 className="b-post__title"><a href={props.href}>{props.title}</a></h3>
      <p className="b-post__date">
        <Time date={props.date}/>
      </p>
      <div className="b-post__body">
        <p dangerouslySetInnerHTML={body()}/>
      </div>
    </article>
  );
};

export default Excerpt;
