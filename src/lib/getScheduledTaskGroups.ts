import { ITask } from 'src/types';
import { groupBy, flow, filter, forOwn, sortBy, reverse, map } from 'lodash/fp';
import { isTomorrow, isToday, isThisMonth, isBeforeThisMonth } from './date';
import { ITaskListGroup } from 'src/components/TaskListGroup';
import { toPairs } from 'lodash';

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
