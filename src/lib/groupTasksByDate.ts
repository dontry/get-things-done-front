import { flow, groupBy, map, reverse, sortBy, toPairs } from 'lodash/fp';
import moment from 'moment';
import { ITaskListGroup } from 'src/components/TaskListGroup';
import { ITask, TimeBasedProperty } from 'src/types';

export function groupTasksByDate(tasks: ITask[], property: TimeBasedProperty) {
  const pipeline = flow(
    groupBy((task: ITask) => {
      const date = moment(task[property]);
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
