import React, { useCallback } from 'react';
import { Task } from '../../classes';
import { INewTask, Category } from '../../types';
import { getToday } from '../../lib/date';
import { categoryToAttribute } from '../../lib/categoryToAttribute';
import { useCreateTask } from '../../hooks/taskHooks';
import TaskInput from './TaskInput';

interface ICategoryTaskInputProps {
  category: Category;
  userId: string;
  projectId?: string;
}

export const CategoryTaskInput = ({ category, userId, projectId }: ICategoryTaskInputProps) => {
  const { createTask } = useCreateTask();

  const onCreateTask = useCallback(
    (title: string) => {
      createNewTask(title, userId, category, projectId);
    },
    [createNewTask, userId, category, projectId]
  );

  return <TaskInput onCreateTask={onCreateTask} />;

  function createNewTask(
    _title: string,
    _userId: string,
    _category: Category,
    _projectId?: string
  ): void {
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
  }
};
