import { inject, observer } from 'mobx-react';
import React, { useCallback } from 'react';

import { Task } from '../../classes';
import { useCreateTask } from '../../hooks/taskHooks';
import { INewTask } from '../../types';
import TaskInput from './TaskInput';

interface IContextTaskInputProps {
  contextId: string;
  userId: string;
}

export const ContextTaskInput = ({ contextId, userId }: IContextTaskInputProps) => {
  const { createTask } = useCreateTask();

  const createNewTask = useCallback((_title: string, _userId: string, _contextId: string) => {
    const newTask = new Task({
      attribute: 'inbox',
      title: _title,
      userId: _userId,
      context: _contextId
    });
    createTask({ task: newTask.toJson() as INewTask });
  }, [createTask])

  const onCreateTask = useCallback(
    (title: string) => {
      createNewTask(title, userId, contextId);
    },
    [createNewTask, userId, contextId]
  );

  return <TaskInput onCreateTask={onCreateTask} />;
};

export default inject('userStore')(
  observer(({ userStore, ...rest }) => <TaskInput userId={userStore.userId} {...rest} />)
);
