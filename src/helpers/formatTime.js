import moment from 'moment';

export default function formatTime(date) {
  if (date) {
    const d = moment(date);

    return {
      time: () => d.format('h:mm:ss a'),
      date: () => d.format('MM/DD/YY'),
      full: () => d.format('h:mm:ss a MM/DD/YY'),
    };
  }

  const noop = () => null;

  return {
    time: noop,
    date: noop,
    full: noop,
  };
}
