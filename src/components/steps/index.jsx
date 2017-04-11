import React from 'react';
// import PropTypes from 'prop-types';
import {Block} from '../';
import Button from '../button';
import defaults from './defaults';

const Steps = props => {
  const items = [];
  let key = 0;
  const id = () => (++key);
  props.items.forEach((item, i) => {
    items.push(
      <article key={id()} className="c-steps__item">
        <h2 className="h4"><a href={item.href}>{item.heading}</a></h2>
        <p>{item.description}</p>
        {item.button ? <Button {...item.button}/> : null}
      </article>
    );
    if (i < props.items.length - 1) {
      items.push(<hr key={id()}/>);
    }
  });
  return (
    <div className="c-steps">
      <Block>
        <div className="c-steps__list">
          {items}
        </div>
      </Block>
    </div>
  );
};

// Steps.propTypes = {
//   items: PropTypes.arrayOf(PropTypes.shape({
//     href: PropTypes.string,
//     heading: PropTypes.string,
//     description: PropTypes.string,
//     button: PropTypes.shape({...Button.propTypes})
//   }))
// };

Steps.defaultProps = defaults;

export default Steps;
