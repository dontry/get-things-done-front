import React from "react";
import { withRouter } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import TaskList from "../components/TaskList";

interface ITaskBoardProps {
  query: string;
}

const TaskBoard: React.FC<ITaskBoardProps> = ({ query }) => {
  function onDragEnd(result: object): void {
    // TODO
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <TaskList type={query} />
    </DragDropContext>
  );
};

export default TaskBoard;
