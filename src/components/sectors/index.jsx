import React from 'react';
import PropTypes from 'prop-types';
import {Block} from '../';
import Sector from '../sector';

const Sectors = ({items}) => {
  return (
    <div className="c-sectors">
      <Block>
        <div className="c-sectors__list">
          <div className="c-sectors__item">
            <Sector {...items[0]}/>
          </div>
          <div className="c-sectors__item">
            <Sector {...items[1]}/>
          </div>
        </div>
      </Block>
    </div>
  );
};

Sectors.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({...Sector.propTypes})
  )
};

Sectors.defaultProps = require('./defaults');

export default Sectors;
