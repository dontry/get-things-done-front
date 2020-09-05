import React, { memo, ReactNode } from 'react';
import { Form, Spin } from 'antd';
import styled from 'styled-components';
import { TaskList } from './TaskList';
import Mask from './Mask';
import { ITask } from 'src/types';

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
  return (
    <Container>
      {TaskInput && <Form>{TaskInput}</Form>}
      <>
        {isLoading ? (
          <Mask>
            <Spin size='large' />
          </Mask>
        ) : (
          <TaskList type={type} tasks={items} />
        )}
      </>
    </Container>
  );
});

export default TaskBoard;
