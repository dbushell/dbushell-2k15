import React from 'react';
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const abbrMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];
const Time = props => {
  const date = new Date(props.date);
  const attr = {
    className: 'time',
    dateTime: date.toISOString()
  };
  const time = {
    dddd: days[date.getDay()],
    D: date.getDate(),
    MMMM: months[date.getMonth()],
    MMM: abbrMonths[date.getMonth()],
    Y: date.getFullYear()
  };
  // use dangerouslySetInnerHTML to avoid inline
  // whitespace issues with ReactDOM.hydrate()
  return (
    <time
      {...attr}
      dangerouslySetInnerHTML={{
        __html: `${time.dddd} <b>${time.D} <abbr title="${time.MMMM}">${
          time.MMM
        }</abbr> ${time.Y}</b>`
      }}
    />
  );
};
export default Time;
