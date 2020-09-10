import React, { memo } from 'react';
import { ITask } from 'src/types';

import { TaskListBody } from './style';
import TaskItem from './TaskItem';

interface ITaskListProps {
  type: string;
  tasks: ITask[];
}

const TaskList = memo(({ tasks, type }: ITaskListProps) => (
    <TaskListBody>
      {tasks.map(task => (
        <TaskItem type={type} key={task.id} task={task} />
      ))}
    </TaskListBody>
  ));

export default TaskList;
