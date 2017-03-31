import React, {PropTypes} from 'react';
import {Time} from '../';

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
        {props.items.map(item => (
          <li className="b-blog__item" key={item.id}>
            <a rel="bookmark" href={item.href}>{item.title}</a>
            <Time date={item.date}/>
          </li>
        ))}
      </ul>
    </aside>
  );
};

Blog.propTypes = {
  heading: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      href: PropTypes.string,
      date: PropTypes.number
    })
  )
};

Blog.defaultProps = require('./defaults');

export default Blog;
