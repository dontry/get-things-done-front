import { flow, groupBy, map, sortBy, toPairs } from 'lodash/fp';
import { ITask } from 'src/types';

import { getTaskCategory } from './getTaskCategory';

const groupOrder = [
  'inbox',
  'today',
  'tomorrow',
  'next',
  'scheduled',
  'someday',
  'note',
  'completed',
  'deleted'
];

export function groupTasksByCategory(tasks: ITask[]) {
  const pipeline = flow(
    groupBy(getTaskCategory),
    toPairs,
    map(([category, _tasks]: [string, ITask[]]) => ({
      name: category,
      tasks: _tasks
    })),
    sortBy(group => groupOrder.indexOf(group.name))
  );
  return pipeline(tasks);
}
