import React from 'react';
// import PropTypes from 'prop-types';

const Headline = props => {
  return (
    <div className="e-headline">
      <h1>{props.children}</h1>
    </div>
  );
};

// Headline.propTypes = {
//   children: PropTypes.node
// };

// Headline.defaultProps = {
//   children: 'Headline'
// };

export default Headline;
