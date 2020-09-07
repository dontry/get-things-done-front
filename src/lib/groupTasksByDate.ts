import { ITask, TimeBasedProperty } from 'src/types';
import { groupBy, flow, sortBy, reverse, toPairs, map } from 'lodash/fp';
import moment from 'moment';
import { ITaskListGroup } from 'src/components/TaskListGroup';

export function groupTasksByDate(tasks: ITask[], property: TimeBasedProperty) {
  const pipeline = flow(
    groupBy((task: ITask) => {
      const date = moment(task.startAt);
      return date.format('YYYY/MM/DD');
    }),
    toPairs,
    map(([date, _tasks]: [string, ITask[]]) => ({
      name: date,
      tasks: _tasks
    })),
    sortBy((group1: ITaskListGroup) => group1.name),
    reverse
  );
  return pipeline(tasks);
}
