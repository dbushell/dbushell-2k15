import React from 'react';
// import PropTypes from 'prop-types';

const Icon = props => {
  const icon = id => {
    return {__html: `<use xlink:href="/assets/img/icons.svg#${id}"></use>`};
  };
  return (
    <svg role="presentation" dangerouslySetInnerHTML={icon(props.id)}/>
  );
};

// Icon.propTypes = {
//   id: PropTypes.string.isRequired
// };

export default Icon;
