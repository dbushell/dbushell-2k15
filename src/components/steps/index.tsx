import React from 'react';
import Block from '../block';
import Button from '../button';
import defaults from './defaults.json';

const StepsItem: React.SFC<StepsItemProps> = props => {
  return (
    <article className="c-steps__item">
      <h2 className="h4"><a href={props.href}>{props.heading}</a></h2>
      <p>{props.description}</p>
      {props.button ? <Button {...props.button}/> : null}
    </article>
  );
};

const Steps: React.SFC<StepsProps> = props => {
  const items = [];
  let key = 0;
  const id = () => (++key);
  props.items.forEach((item, i) => {
    items.push(<StepsItem key={id()} {...item}/>);
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

Steps.defaultProps = defaults;

export default Steps;
