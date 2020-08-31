import moment from 'moment';

export function isToday(timestamp: number): boolean {
  const today = moment().startOf('day');
  return today.isSame(moment(timestamp), 'day');
}

export function isTomorrow(timestamp: number): boolean {
  const tomorrow = moment()
    .add(1, 'day')
    .startOf('day');
  return tomorrow.isSame(moment(timestamp), 'day');
}

export function getToday(): number {
  return (
    moment()
      .startOf('day')
      .unix() * 1000
  );
}

export function getTomorrow(): number {
  return (
    moment()
      .add(1, 'days')
      .startOf('day')
      .unix() * 1000
  );
}
