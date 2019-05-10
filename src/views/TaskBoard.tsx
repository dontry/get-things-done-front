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
import { ITask, INewTask, Attribute, RequestType } from "../types";
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

const useNewTaskTitle = () => {
  const [newTaskTitle, setTaskTitle] = useState("");
  return { newTaskTitle, setTaskTitle };
};

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
  attribute: Attribute;
  userId: string;
  tasks: ITask[];
  fetching: boolean;
}

const TaskBoard = ({ attribute, tasks, userId, fetching }: ITaskBoardProps) => {
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
        {fetching ? (
          <Mask>
            <Spin size="large" />
          </Mask>
        ) : (
          <TaskList id={attribute} type={attribute} tasks={tasks} />
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

  function _handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    createNewTask();
  }

  function _handleChange(e: React.SyntheticEvent<HTMLInputElement>) {
    setTaskTitle(e.currentTarget.value);
  }

  function _handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      createNewTask();
    }
  }

  async function createNewTask() {
    if (newTaskTitle !== "") {
      const newTask = new Task({
        title: newTaskTitle,
        attribute,
        userId
      });

      await taskAction.createTask(newTask);
      setTaskTitle("");
    }
  }
};

// { location }: RouteComponentProps
export default inject("taskStore", "requestStore", "userStore")(
  observer(({ taskStore, requestStore, userStore, match, ...rest }) => {
    const { attribute } = match.params;
    let tasks = [];
    switch (attribute) {
      case "inbox":
        tasks = taskStore.inboxTasks;
        break;
      case "plan":
        tasks = taskStore.planTasks;
        break;
      case "next":
        tasks = taskStore.nextTasks;
        break;
      case "today":
        tasks = taskStore.todayTasks;
        break;
      default:
        break;
    }
    return (
      <TaskBoard
        attribute={attribute}
        tasks={tasks}
        userId={userStore.userId}
        fetching={requestStore.getRequestByType(RequestType.TASK)}
      />
    );
  })
);
