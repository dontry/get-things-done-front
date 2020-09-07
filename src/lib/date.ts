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

export function isThisMonth(timestamp: number): boolean {
  const thisMonth = moment().startOf('month');
  return thisMonth.isSame(moment(timestamp), 'month');
}

export function isAfterThisMonth(timestamp: number): boolean {
  const thisMonth = moment().startOf('month');
  return thisMonth.isBefore(moment(timestamp), 'month');
}

export function isBeforeThisMonth(timestamp: number): boolean {
  const thisMonth = moment().startOf('month');
  return thisMonth.isAfter(moment(timestamp), 'month');
}

// milliseconds
export function getToday(): number {
  return (
    moment()
      .startOf('day')
      .unix() * 1000
  );
}

// milliseconds
export function getTomorrow(): number {
  return (
    moment()
      .add(1, 'days')
      .startOf('day')
      .unix() * 1000
  );
}
