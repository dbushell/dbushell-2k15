import React, {PropTypes} from 'react';
import {Time} from '../';

const Excerpt = props => {
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

Excerpt.propTypes = {
  date: PropTypes.number,
  title: PropTypes.string,
  href: PropTypes.string,
  body: PropTypes.string
};

Excerpt.defaultProps = {
  date: Date.now(),
  title: 'Untitled'
};

export default Excerpt;
