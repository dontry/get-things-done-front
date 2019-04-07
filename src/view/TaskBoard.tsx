import React from "react";
import { RouteComponentProps } from "react-router";
import { DragDropContext } from "react-beautiful-dnd";
import TaskList from "../components/TaskList/TaskList";
import styled from "styled-components";

const Container = styled.div`
  background-color: #fff;
  height: 100%;
`;

const TaskBoard: React.FC<RouteComponentProps> = ({ location }) => {
  const params = new URLSearchParams(location.search);

  function onDragEnd(result: object): void {
    // TODO
  }
  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskList type="today" />
      </DragDropContext>
    </Container>
  );
};

export default TaskBoard;
