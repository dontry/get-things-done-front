import { toPairs } from 'lodash';
import { filter, flow, groupBy, map, sortBy } from 'lodash/fp';
import { ITaskListGroup } from 'src/components/TaskListGroup';
import { ITask } from 'src/types';

import { isBeforeThisMonth, isThisMonth, isToday, isTomorrow } from './date';

const groupNames = ['This month', 'Next month and later'];

export function getScheduledGroupTasks(tasks: ITask[]) {
  const pipeline = flow(
    filter(
      (task: ITask) =>
        !isToday(task.startAt) && !isTomorrow(task.startAt) && !isBeforeThisMonth(task.startAt)
    ),
    groupBy((task: ITask) => {
      if (isThisMonth(task.startAt)) {
        return 'This month';
      } else {
        return 'Next month and later';
      }
    }),
    toPairs,
    map(([name, _tasks]: [string, ITask[]]) => ({
      name,
      tasks: _tasks
    })),
    sortBy((group1: ITaskListGroup) => groupNames.indexOf(group1.name))
  );
  return pipeline(tasks);
}
