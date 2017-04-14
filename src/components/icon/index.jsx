import React from 'react';
const Icon = props => {
  const icon = id => {
    return {__html: `<use xlink:href="/assets/img/icons.svg#${id}"></use>`};
  };
  return React.createElement('svg', {
    role: 'presentation',
    dangerouslySetInnerHTML: icon(props.id)
  });
};
export default Icon;
