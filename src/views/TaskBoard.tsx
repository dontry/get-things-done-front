import React, { useState, useEffect } from "react"
import {inject, observer } from "mobx-react";
import { RouteComponentProps } from "react-router";
import { Layout, Form, Input } from "antd";
import { DragDropContext } from "react-beautiful-dnd";
import TaskList from "../components/TaskList/TaskList";
import TaskInput from "../components/TaskInput"
import styled from "styled-components";
import { Priority, ITask } from "../types"


const Container = styled.div`
  background-color: #fff;
  height: 100%;
`;

interface ITaskList {
  id: string;
  title: string;
  taskIds: string[];
}


const useTaskList = (initialList: any[]) => {
  const [list, setList] = useState(initialList);
  return { list, setList }
}

const useNewTaskTitle = () => {
  const [newTaskTitle, setTaskTitle] = useState("");
  return { newTaskTitle, setTaskTitle }
}

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
}


const TaskBoard = ({type, tasks}: ITaskBoardProps) => {
  const { newTaskTitle, setTaskTitle } = useNewTaskTitle();
  const taskIds = tasks.map(task => task.id);
  const { list, setList } = useTaskList(taskIds);


  return (
    <Container>
      <Form>
        <TaskInput onSubmit={_handleSubmit} onChange={_handleChange} value={newTaskTitle} />
      </Form>
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskList id={type} type={type} tasks={tasks} />
      </DragDropContext>
    </Container>
  );

  function onDragEnd(result: object): void {
    const { destination, source, draggableId, type }: any = result;
    // If destination is not a droppable area
    if (!destination) { return; }
    // If the draggable object not move
    if (destination.droppableId === source.droppableId && destination.index === source.index) { return; }
    list.splice(source.index, 1);
    list.splice(destination.index, 0, draggableId);
    setList(list);
  }

  function _handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const newTask = {
      id: "xxx",
      title: newTaskTitle,
      attribute: "inbox",
      priority: Priority.MEDIUM,
      createdAt: Date.now(),
      startAt: 0,
      endAt: 0,
      estimatedtime: 0,
      context: null,
      spentTime: 0,
      allDay: true,
      deleted: false,
      completed: false,
      archived: false,
      tags: [],
      note: { content: "" }
    }

  //  tasks = {
  //    [newTask.id]: newTask,
  //    ...tasks,
  //  }
    setList([newTask.id, ...list]);
    setTaskTitle("")
  }

  function _handleChange(e: React.SyntheticEvent<HTMLInputElement>) {
    setTaskTitle(e.currentTarget.value)
  }
};

// { location }: RouteComponentProps
export default inject("taskStore")(
  observer(({taskStore, match, ...rest}) => {
  const {type} = match.params;
  let tasks = []
  switch(type) {
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
  return <TaskBoard type={type} tasks={tasks} />
}))
