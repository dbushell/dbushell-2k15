import React, {PropTypes} from 'react';
import {Block} from '../';
import Button from '../button';

const Clients = props => {
  return (
    <div className="c-clients u-dark">
      <Block>
        <div className="c-clients__header">
          <h2>{props.heading}</h2>
        </div>
        {props.blockquotes.map(item => (
          <blockquote key={item.id}>
            <p className="p--large p--quote">{item.quote}</p>
            <p className="p--small"><cite>{item.href ?
              <a href={item.href}>{item.cite}</a> : item.cite}</cite></p>
          </blockquote>
        ))}
        <div className="c-clients__footer">
          <Button {...props.button}/>
        </div>
      </Block>
    </div>
  );
};

Clients.propTypes = {
  heading: PropTypes.string,
  button: PropTypes.shape({...Button.propTypes}),
  blockquotes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    quotation: PropTypes.string,
    cite: PropTypes.string,
    href: PropTypes.string
  }))
};

Clients.defaultProps = require('./defaults');

export default Clients;
