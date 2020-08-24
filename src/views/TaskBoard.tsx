import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Form, Input, Spin, Pagination } from "antd";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import TaskList from "../components/TaskList/TaskList";
import TaskInput from "../components/TaskInput";
import * as taskAction from "../actions/taskAction";
import Mask from "../components/Mask";
import { inject, observer } from "mobx-react";

const Container = styled.div`
  position: relative;
  background-color: #fff;
  height: 100%;
  overflow: auto;
`;

const inputVisibleType = ["inbox", "today", "next", "scheduled", "someday", "reference"];

interface ITaskBoardProps {
  category: string;
}

const TaskBoard = ({ category }: ITaskBoardProps) => {
  const isTaskInputVisible = useMemo(() => {
    return inputVisibleType.includes(category);
  }, [category]);

  const [pageIndex, setPageIndex] = useState(1);
  const paginationParams = useMemo(() => `page=${pageIndex}&limit=15`, [pageIndex]);

  const { status, items, pageCount } = taskAction.useFetchTasks(category, paginationParams);

  return (
    <Container>
      {isTaskInputVisible && (
        <Form>
          <TaskInput type={category} />
        </Form>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        {status === "loading" ? (
          <Mask>
            <Spin size="large" />
          </Mask>
        ) : (
          <TaskList id={category} category={category} tasks={items} />
        )}
      </DragDropContext>
      {pageCount > 0 && (
        <Pagination
          defaultCurrent={1}
          total={pageCount}
          onChange={handlePaginationChange}
        ></Pagination>
      )}
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

  function handlePaginationChange(page: number) {
    useCallback(() => {
      setPageIndex(page);
    }, [page]);
  }
};

export default inject()(observer(({ match }) => <TaskBoard category={match.params.type} />));
