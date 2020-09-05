import { Category, ITask, Attribute } from 'src/types';
import { isToday, isTomorrow } from './date';

export function getTaskCategory(task: ITask): Category {
  const attribute: Attribute = task.attribute;
  const startAt: number = task.startAt;
  const completedAt: number = task.completedAt;
  const deleted: number = task.deleted;

  if (deleted) {
    return 'deleted';
  }

  if (completedAt > 0) {
    return 'completed';
  }

  if (['inbox', 'next', 'note'].includes(attribute)) {
    return attribute as Category;
  } else if (attribute === 'plan' || startAt > 0) {
    if (isToday(startAt)) {
      return 'today';
    } else if (isTomorrow(startAt)) {
      return 'tomorrow';
    } else {
      return 'scheduled';
    }
  } else {
    return 'someday';
  }
}
