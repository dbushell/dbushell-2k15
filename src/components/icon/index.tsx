import React from 'react';

interface IconProps {
  id: string
}

const Icon: React.SFC<IconProps> = props => {
  const icon = id => {
    return {__html: `<use xlink:href="/assets/img/icons.svg#${id}"></use>`};
  };
  // stop TypeScript complaining about `role` attribute
  // <svg role="presentation" dangerouslySetInnerHTML={icon(props.id)}/>
  return React.createElement('svg', { role: 'presentation',
    dangerouslySetInnerHTML: icon(props.id)
  });
};

export default Icon;
