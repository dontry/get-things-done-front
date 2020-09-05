import React, { memo, ReactNode } from 'react';
import { Form, Spin } from 'antd';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskList from './TaskList/TaskList';
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
      <DragDropContext onDragEnd={onDragEnd}>
        {isLoading ? (
          <Mask>
            <Spin size='large' />
          </Mask>
        ) : (
          <TaskList id={type} type={type} tasks={items} />
        )}
      </DragDropContext>
    </Container>
  );

  function onDragEnd(result: object): void {
    const { destination, source, draggableId, type }: any = result;
    // If destination is not a droppable area
    if (!destination) {
      return;
    }
    // If the draggable object not move
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    // TODO: reorder list
    // list.splice(source.index, 1);
    // list.splice(destination.index, 0, draggableId);
    // setList(list);
  }
});

export default TaskBoard;
