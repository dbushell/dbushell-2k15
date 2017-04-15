import React from 'react';
import * as P from '../../components';

const Patterns = props => {
  return (
    <P.Block isMain>
      <P.Block>
        <P.Post>
          <div className="b-post__title">
            <h1>{props.pageHeading}</h1>
          </div>
          <hr/>
          <h2>Biography</h2>
          <div className="b-post__pattern">
            <P.Bio/>
          </div>
          <h2>Blog latest</h2>
          <div className="b-post__pattern">
            <P.Blog/>
          </div>
          <h2>Call to Action</h2>
          <div className="b-post__pattern">
            <P.Cta/>
          </div>
          <h2>Newsletter</h2>
          <div className="b-post__pattern">
            <P.Newsletter/>
          </div>
          <h2>Sector</h2>
          <div className="b-post__pattern">
            <P.Sector {...P.Sectors.defaultProps.items[1]}/>
          </div>
          <h2>Sector RTL</h2>
          <div className="b-post__pattern">
            <P.Sector {...P.Sectors.defaultProps.items[0]}/>
          </div>
        </P.Post>
      </P.Block>
    </P.Block>
  );
};

// Patterns.propTypes = {
//   pageHeading: PropTypes.string
// };

Patterns.defaultProps = {
  pageHeading: 'Pattern Library'
};

export default Patterns;
