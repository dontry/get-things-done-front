import React, { useState, useEffect, useRef } from "react";
import { inject, observer } from "mobx-react";
import { RouteComponentProps } from "react-router";
import { Layout, Form, Input, Spin } from "antd";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import TaskList from "../components/TaskList/TaskList";
import TaskInput from "../components/TaskInput";
import * as taskAction from "../actions/taskAction";
import { RequestType } from "../types";
import { ITask, INewTask } from "../types";

const Container = styled.div`
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

const useNewTaskTitle = () => {
  const [newTaskTitle, setTaskTitle] = useState("");
  return { newTaskTitle, setTaskTitle };
};

// const useKeyDown = (map, defaultValue) => {
//   const [match, setMatch] = useState(defaultValue);
//   useEffect(() => {
//     const handleKey = ({ key }) => {
//       setMatch(prevMatch =>
//         Object.keys(map).some(k => k === key) ? map[key] : prevMatch
//       );
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
  const { newTaskTitle, setTaskTitle } = useNewTaskTitle();
  const isMounted = useRef(true);
  // const taskIds = tasks.map(task => task.id);
  // const { list, setList } = useTaskList(taskIds);

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
      <Form>
        <TaskInput onSubmit={_handleSubmit} onChange={_handleChange} value={newTaskTitle} />
      </Form>
      <DragDropContext onDragEnd={onDragEnd}>
        {fetching ? <Spin size="large" /> : <TaskList id={type} type={type} tasks={tasks} />}
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

  function _handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    // const newTask: INewTask = {
    //   title: newTaskTitle,
    //   attribute: "inbox",
    //   priority: Priority.MEDIUM,
    //   createdAt: Date.now(),
    //   startAt: 0,
    //   endAt: 0,
    //   estimatedTime: 0,
    //   context: "",
    //   spentTime: 0,
    //   allDay: true,
    //   deleted: 0,
    //   completed: 0,
    //   archived: 0,
    //   tags: [],
    //   note: { content: "" }
    // }

    setTaskTitle("");
  }

  function _handleChange(e: React.SyntheticEvent<HTMLInputElement>) {
    setTaskTitle(e.currentTarget.value);
  }
};

// { location }: RouteComponentProps
export default inject("taskStore", "requestStore")(
  observer(({ taskStore, requestStore, match, ...rest }) => {
    const { type } = match.params;
    let tasks = [];
    switch (type) {
      case "inbox":
        tasks = taskStore.inboxTasks;
        break;
      case "plan":
        tasks = taskStore.planTasks;
        break;
      case "next":
        tasks = taskStore.nextTasks;
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
