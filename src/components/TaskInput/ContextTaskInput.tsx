import React, { useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import { Task } from '../../classes';
import { INewTask, Category } from '../../types';
import { useCreateTask } from '../../actions/taskAction';
import TaskInput from './TaskInput';

interface IContextTaskInputProps {
  contextId: string;
  userId: string;
}

export const ContextTaskInput = ({ contextId, userId }: IContextTaskInputProps) => {
  const { createTask } = useCreateTask();

  const onCreateTask = useCallback(
    (title: string) => {
      createNewTask(title, userId, contextId);
    },
    [createNewTask, userId, contextId]
  );

  return <TaskInput onCreateTask={onCreateTask} />;

  function createNewTask(_title: string, _userId: string, _contextId: string): void {
    const newTask = new Task({
      attribute: 'inbox',
      title: _title,
      userId: _userId,
      context: _contextId
    });
    createTask({ task: newTask.toJson() as INewTask });
  }
};

export default inject('userStore')(
  observer(({ userStore, ...rest }) => {
    return <TaskInput userId={userStore.userId} {...rest} />;
  })
);
