import React, { useCallback } from 'react';

import { Task } from '../../classes';
import { useCreateTask } from '../../hooks/taskHooks';
import { categoryToAttribute } from '../../lib/categoryToAttribute';
import { getToday } from '../../lib/date';
import { Category, INewTask } from '../../types';
import TaskInput from './TaskInput';

interface ICategoryTaskInputProps {
  category: Category;
  userId: string;
  projectId?: string;
}

export const CategoryTaskInput = ({ category, userId, projectId }: ICategoryTaskInputProps) => {
  const { createTask } = useCreateTask();

  const createNewTask = useCallback((
    _title: string,
    _userId: string,
    _category: Category,
    _projectId?: string
  ) => {
    if (_title === '') {
      return;
    }
    const attribute = categoryToAttribute(_category);
    let newTask: Task;
    switch (attribute as string) {
      case 'today':
        newTask = new Task({
          attribute,
          title: _title,
          userId: _userId,
          startAt: getToday(),
          projectId: _projectId
        });
        break;
      case 'tomorrow':
        newTask = new Task({
          attribute,
          title: _title,
          userId: _userId,
          startAt: getToday(),
          projectId: _projectId
        });
        break;
      case 'note':
      case 'someday':
      case 'inbox':
      case 'next':
      default:
        newTask = new Task({
          attribute,
          title: _title,
          userId: _userId,
          projectId: _projectId
        });
    }
    createTask({ task: newTask.toJson() as INewTask });
  }, [createTask])

  const onCreateTask = useCallback(
    (title: string) => {
      createNewTask(title, userId, category, projectId);
    },
    [createNewTask, userId, category, projectId]
  );

  return <TaskInput onCreateTask={onCreateTask} />;
};
