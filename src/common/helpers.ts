import moment from 'moment';

export function parseToDate(timestamp: number) {
  let date = '';
  const parsed = moment(timestamp);

  if (parsed.isValid()) {
    date = parsed.toDate().toLocaleString();
  }
  return date;
}
