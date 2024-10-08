import moment from 'moment';

export function parseToDate(timestamp: number): Date | undefined {
  let date;
  const parsed = moment(timestamp);

  if (parsed.isValid()) {
    date = parsed.toDate();
  }
  return date;
}
