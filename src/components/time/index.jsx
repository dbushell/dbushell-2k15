import React from 'react';
// import PropTypes from 'prop-types';
import moment from 'moment';

const Time = props => {
  const time = moment(props.date);
  const attr = {
    className: 'time',
    dateTime: time.toISOString()
  };
  return (
    <time {...attr}>
      {time.format('dddd')} <b>{time.format('D')} <abbr title={time.format('MMMM')}>{time.format('MMM')}</abbr> {time.format('Y')}</b>
    </time>
  );
};

// Time.propTypes = {
//   date: PropTypes.number
// };

Time.defaultProps = {
  date: 946598400000
};

export default Time;
