import React from 'react';

const Icon: React.SFC<IconProps> = props => {
  const icon = id => {
    return {__html: `<use xlink:href="/assets/img/icons.svg#${id}"></use>`};
  };
  const attr = {
    role: 'presentation'
  };
  return (
    <svg {...attr} dangerouslySetInnerHTML={icon(props.id)}/>
  );
};

export default Icon;
