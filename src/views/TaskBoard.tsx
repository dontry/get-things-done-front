import React, { useState, useMemo, memo } from 'react';
import { Form, Spin } from 'antd';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskList from '../components/TaskList/TaskList';
import { CategoryTaskInput } from '../components/TaskInput';
import * as taskAction from '../actions/taskAction';
import Mask from '../components/Mask';
import { inject, observer } from 'mobx-react';
import { Category } from 'src/types';

const Container = styled.div`
  position: relative;
  background-color: #fff;
  height: 100%;
  overflow: auto;
`;

const inputVisibleType = ['inbox', 'today', 'next', 'scheduled', 'someday', 'reference'];

interface ITaskBoardProps {
  userId: string;
  category: string;
}

const TaskBoard = memo(({ category, userId }: ITaskBoardProps) => {
  const isTaskInputVisible = useMemo(() => {
    return inputVisibleType.includes(category);
  }, [category]);

  const [pageIndex] = useState(1);
  const paginationParams = useMemo(() => `page=${pageIndex}&limit=100`, [pageIndex]);
  const { items, isFetching } = taskAction.useFetchTasksByCategory(category, paginationParams);

  return (
    <Container>
      {isTaskInputVisible && (
        <Form>
          <CategoryTaskInput category={category as Category} userId={userId} />
        </Form>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        {isFetching ? (
          <Mask>
            <Spin size='large' />
          </Mask>
        ) : (
          <TaskList id={category} type={category} tasks={items} />
        )}
      </DragDropContext>
    </Container>
  );

  function onDragEnd(result: object): void {
    const { destination, source }: any = result;
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

export default inject('userStore')(
  observer(({ userStore, match }) => (
    <TaskBoard category={match.params.type} userId={userStore.userId} />
  ))
);
