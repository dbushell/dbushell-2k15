import React from 'react';

const Icon = props => {
  const icon = id => {
    return {__html: `<use xlink:href="/assets/img/icons.svg#${id}"></use>`};
  };
  // const attr = {
  //   role: 'presentation'
  // };
  return <svg dangerouslySetInnerHTML={icon(props.id)} />;
};

export default Icon;
