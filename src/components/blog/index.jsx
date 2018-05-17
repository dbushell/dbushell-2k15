import React from 'react';
import pure from '../pure';
import Time from '../time';
import defaults from './defaults';

const BlogItem = props => {
  return (
    <li className="b-blog__item">
      <a rel="bookmark" href={props.href}>
        {props.title}
      </a>
      <Time date={props.date} />
    </li>
  );
};

const Blog = props => {
  const attr = {
    className: 'b-blog',
    role: 'navigation'
  };
  return (
    <aside {...attr}>
      <div className="b-blog__title">
        <h3>{props.heading}</h3>
      </div>
      <ul className="b-blog__list">
        {props.items.map(item => <BlogItem key={item.id} {...item} />)}
      </ul>
    </aside>
  );
};

Blog.defaultProps = defaults;

export default pure(Blog);
