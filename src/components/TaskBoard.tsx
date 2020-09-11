import { Form, Spin } from 'antd';
import React, { memo, ReactNode, useCallback } from 'react';
import { ITask } from 'src/types';
import styled from 'styled-components';

import { groupTasksByContext } from '../lib/groupTasksByContext';
import Mask from './Mask';
import { TaskList } from './TaskList';
import TaskListGroup, { ITaskListGroup } from './TaskListGroup';
import { TimeLineTaskListGroup } from './TimeLineTaskListGroup';

const Container = styled.div`
  position: relative;
  background-color: #fff;
  height: 100%;
  overflow: auto;
`;

interface ITaskBoardProps {
  type: string;
  isLoading: boolean;
  items: ITask[];
  TaskInput?: ReactNode;
}

const TaskBoard = memo(({ type, isLoading, items, TaskInput }: ITaskBoardProps) => {
  const renderTasksSection = useCallback(() => {
    switch (type) {
      case 'today':
      case 'tomorrow':
        const taskListGroups = groupTasksByContext(items) as ITaskListGroup[];
        return <TaskListGroup groups={taskListGroups} />;
      case 'scheduled':
      case 'completed':
      case 'deleted':
        return <TimeLineTaskListGroup tasks={items} type={type} />;
      case 'inbox':
      case 'next':
      case 'someday':
      case 'note':
      default:
        return <TaskList type={type} tasks={items} />;
    }
  }, [type, items]);

  return (
    <Container>
      {TaskInput && <Form>{TaskInput}</Form>}
      <>
        {isLoading ? (
          <Mask>
            <Spin size='large' />
          </Mask>
        ) : (
          <div style={{ padding: '8px' }}>{renderTasksSection()}</div>
        )}
      </>
    </Container>
  );
});

export default TaskBoard;
