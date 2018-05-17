import React from 'react';
import Block from '../block';
import Button from '../button';
import defaults from './defaults';

const ClientsItem = props => {
  return (
    <blockquote>
      <p className="p--large p--quote">{props.quote}</p>
      <p className="p--small">
        <cite>
          {props.href ? <a href={props.href}>{props.cite}</a> : props.cite}
        </cite>
      </p>
    </blockquote>
  );
};

const Clients = props => {
  return (
    <div className="c-clients u-dark">
      <Block>
        <div className="c-clients__header">
          <h2>{props.heading}</h2>
        </div>
        {props.blockquotes.map(item => <ClientsItem key={item.id} {...item} />)}
        <div className="c-clients__footer">
          <Button {...props.button} />
        </div>
      </Block>
    </div>
  );
};

Clients.defaultProps = defaults;

export default Clients;
