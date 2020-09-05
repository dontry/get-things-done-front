import { ITask } from 'src/types';
import { groupBy } from 'lodash';
import { getTaskCategory } from './getTaskCategory';

export function groupTasksByCategory(tasks: ITask[]) {
  const taskGroups = groupBy<ITask[]>(tasks, getTaskCategory);
  return Object.entries(taskGroups).map(([groupName, _tasks]) => ({
    name: groupName,
    tasks: _tasks
  }));
}
