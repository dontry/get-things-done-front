import React, { memo } from 'react';
import TaskItem from './TaskItem';
import { TaskListBody } from './style';
import { ITask } from 'src/types';

interface ITaskListProps {
  type: string;
  tasks: ITask[];
}

const TaskList = memo(({ tasks, type }: ITaskListProps) => {
  return (
    <TaskListBody>
      {tasks.map(task => (
        <TaskItem type={type} key={task.id} task={task} />
      ))}
    </TaskListBody>
  );
});

export default TaskList;
