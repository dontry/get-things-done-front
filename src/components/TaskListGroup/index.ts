import { ITask } from 'src/types';
import { TaskListGroup } from './TaskListGroup';
export interface ITaskListGroup {
  name: string;
  tasks: ITask[];
}

export default TaskListGroup;
