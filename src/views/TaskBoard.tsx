import React, { useState, useEffect, useRef } from "react";
import { inject, observer } from "mobx-react";
import { RouteComponentProps } from "react-router";
import { Layout, Form, Input, Spin } from "antd";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import TaskList from "../components/TaskList/TaskList";
import TaskInput from "../components/TaskInput";
import * as taskAction from "../actions/taskAction";
import Task from "../classes/Task";
import { ITask, RequestType } from "../types";
import Mask from "../components/Mask";

const Container = styled.div`
  position: relative;
  background-color: #fff;
  height: 100%;
  overflow: auto;
`;

interface ITaskList {
  id: string;
  title: string;
  taskIds: string[];
}

const useTaskList = (initialList: any[]) => {
  const [list, setList] = useState(initialList);
  return { list, setList };
};

const inputVisibleType = ["inbox", "today", "next", "scheduled", "someday", "reference"];

// const useKeyDown = (map:string[], defaultValue: string, callback: () =>{}) => {
//   const [match, setMatch] = useState(defaultValue);
//   useEffect(() => {
//     const handleKey = async ({ key }: any): Promise<void> => {
//       setMatch(prevMatch =>
//         Object.keys(map).some(k => k === key) ? map[key] : prevMatch
//       );
//       await callback();
//     };
//     document.addEventListener("keydown", handleKey);
//     return () => document.removeEventListener("keydown", handleKey);
//   }, []);
//   return {match, setMatch};
// };

interface ITaskBoardProps {
  type: string;
  tasks: ITask[];
  fetching: boolean;
}

const TaskBoard = ({ type, tasks, fetching }: ITaskBoardProps) => {
  const isMounted = useRef(true);
  // const taskIds = tasks.map(task => task.id);
  // const { list, setList } = useTaskList(taskIds);
  const isTaskInputVisible = checkTaskInputVisibility(type);

  useEffect(() => {
    if (isMounted.current) {
      taskAction.fetchAllTasks();
    }
    return () => {
      isMounted.current = false;
    };
  }, [tasks]);

  return (
    <Container>
      {isTaskInputVisible && (
        <Form>
          <TaskInput type={type} />
        </Form>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        {fetching ? (
          <Mask>
            <Spin size="large" />
          </Mask>
        ) : (
          <TaskList id={type} type={type} tasks={tasks} />
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

  function checkTaskInputVisibility(type: string): boolean {
    return inputVisibleType.includes(type);
  }
};

// { location }: RouteComponentProps
export default inject("taskStore", "requestStore")(
  observer(({ taskStore, requestStore, userStore, match, ...rest }) => {
    const { type } = match.params;
    let tasks = [];
    switch (type) {
      case "inbox":
        tasks = taskStore.inboxTasks;
        break;
      case "plan":
      case "scheduled":
        tasks = taskStore.planTasks;
        break;
      case "next":
        tasks = taskStore.nextTasks;
        break;
      case "today":
        tasks = taskStore.todayTasks;
        break;
      case "completed":
        tasks = taskStore.completedTasks;
        break;
      case "deleted":
        tasks = taskStore.deletedTasks;
        break;
      default:
        break;
    }
    return (
      <TaskBoard
        type={type}
        tasks={tasks}
        fetching={requestStore.getRequestByType(RequestType.TASK)}
      />
    );
  })
);
