import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Layout, Form, Input, Button } from 'antd';
import Task from '../../classes/Task';
import * as taskAction from '../../actions/taskAction';
import { INewTask, Category } from '../../types';
import { getToday } from '../../lib/date';
import { categoryToAttribute } from '../../lib/categoryToAttribute';

const AddButton = styled(Button)`
  font-size: 14px;
  width: 100%;
  height: calc(100% - 1px) !important;
  border: none !important;
  background-color: transparent !important;
`;

const StyledInput = styled(Input)`
  .ant-input-group-addon {
    padding: 0;
  }
`;

const useNewTaskTitle = () => {
  const [newTaskTitle, setTaskTitle] = useState('');
  return { newTaskTitle, setTaskTitle };
};

interface ITaskInputProps {
  category?: Category;
  projectId?: string;
  userId: string;
}

const TaskInput = ({ category, projectId, userId }: ITaskInputProps) => {
  const { newTaskTitle, setTaskTitle } = useNewTaskTitle();

  const { createTask } = taskAction.useCreateTask();

  const handleFinish = () => {
    createNewTaskByCategory(newTaskTitle, userId, category, projectId);
  }

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
  }
  return (
    <Form onFinish={handleFinish}>
      <Layout style={{ backgroundColor: '#fff' }}>
        <Form.Item
          name='title'
          style={{ margin: '16px 8px' }}>
          <StyledInput
            value={newTaskTitle}
            placeholder='Add a new task'
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            addonAfter={<AddButton onClick={handleFinish}>+</AddButton>}
          />
        </Form.Item>
      </Layout>
    </Form>
  );



  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      createNewTaskByCategory(newTaskTitle, userId, category, projectId);
    }
  }

  async function createNewTaskByCategory(
    _title: string,
    _userId: string,
    _category: Category = 'inbox',
    _projectId?: string
  ): Promise<void> {
    if (newTaskTitle === '') {
      return;
    }
    const attribute = categoryToAttribute(_category);
    let newTask: Task;
    switch (attribute as string) {
      case 'today':
        newTask = new Task({
          attribute,
          title: newTaskTitle,
          userId: _userId,
          startAt: getToday(),
          projectId: _projectId,
        });
        break;
      case 'tomorrow':
        newTask = new Task({
          attribute,
          title: newTaskTitle,
          userId: _userId,
          startAt: getToday(),
          projectId: _projectId,
        });
        break;
      case 'note':
      case 'someday':
      case 'inbox':
      case 'next':
      default:
        newTask = new Task({
          attribute,
          title: newTaskTitle,
          userId: _userId,
          projectId: _projectId,
        });
    }
    createTask({ task: newTask.toJson() as INewTask });
    setTaskTitle('');
  }
};

export default inject('userStore')(
  observer(({ userStore, ...rest }) => {
    return <TaskInput userId={userStore.userId} {...rest} />;
  })
);
