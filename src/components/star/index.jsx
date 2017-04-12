import React from 'react';

const Star = props => {
  const star = id => {
    return {__html: `<use xlink:href="/assets/img/stars.svg#${id}"></use>`};
  };
  const attr = {
    className: 'e-star',
    role: 'presentation'
  };
  if (props.blink) {
    attr.className += ' e-star--blink';
  }
  return (
    <svg {...attr} dangerouslySetInnerHTML={star(props.id)}/>
  );
};

// Star.propTypes = {
//   id: PropTypes.string,
//   blink: PropTypes.bool
// };

Star.defaultProps = {
  id: 'star'
};

export default Star;
