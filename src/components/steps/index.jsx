import React, {PropTypes} from 'react';
import {Block} from '../';
import Button from '../button';

const Steps = props => {
  return (
    <div className="c-steps">
      <Block>
        <div className="c-steps__list">
          {props.items.map(item => (
            <article key={item.id} className="c-steps__item">
              <h2 className="h4"><a href={item.href}>{item.heading}</a></h2>
              <p>{item.description}</p>
              {item.button ? <Button {...item.button}/> : null}
            </article>
          ))}
        </div>
      </Block>
    </div>
  );
};

Steps.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    href: PropTypes.string,
    heading: PropTypes.string,
    description: PropTypes.string,
    button: PropTypes.shape({...Button.propTypes})
  }))
};

Steps.defaultProps = require('./defaults');

export default Steps;
