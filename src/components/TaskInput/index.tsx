import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import { Layout, Form, Input, Button } from "antd";
import Task from "../../classes/Task";
import * as taskAction from "../../actions/taskAction";
import { Attribute, ITask, INewTask } from "../../types/index";

const AddButton = styled(Button)`
  font-size: 14px;
  width: 100%;
  height: calc(100% - 1px) !important;
  border: none !important;
  background-color: transparent !important;
`;

const StyledInput = styled(Input)`
  .ant-input-group-addon {
    padding: 0;
  }
`;

const useNewTaskTitle = () => {
  const [newTaskTitle, setTaskTitle] = useState("");
  return { newTaskTitle, setTaskTitle };
};

interface ITaskInputProps {
  type: string;
  userId: string;
}

const TaskInput = ({ type, userId }: ITaskInputProps) => {
  const { newTaskTitle, setTaskTitle } = useNewTaskTitle();

  const { createTask } = taskAction.useCreateTask();
  return (
    <Form onSubmit={_handleSubmit}>
      <Layout style={{ backgroundColor: "#fff" }}>
        <Form.Item style={{ margin: "16px 8px" }}>
          <StyledInput
            value={newTaskTitle}
            placeholder="Add a new task"
            onKeyPress={_handleKeyPress}
            onChange={_handleChange}
            addonAfter={<AddButton onClick={_handleSubmit}>+</AddButton>}
          />
        </Form.Item>
      </Layout>
    </Form>
  );

  function _handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    createNewTask(newTaskTitle, type, userId);
  }

  function _handleChange(e: React.SyntheticEvent<HTMLInputElement>) {
    setTaskTitle(e.currentTarget.value);
  }

  function _handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      createNewTask(newTaskTitle, type, userId);
    }
  }

  async function createNewTask(_title: string, _type: string, _userId: string): Promise<void> {
    if (newTaskTitle === "") {
      return;
    }

    let newTask: Task;
    switch (_type) {
      case "today":
        newTask = new Task({
          title: newTaskTitle,
          attribute: "plan",
          userId: _userId,
          startAt: Date.now()
        });
        break;
      case "inbox":
      case "next":
      default:
        newTask = new Task({
          title: newTaskTitle,
          attribute: _type as Attribute,
          userId: _userId
        });
    }
    createTask({ task: newTask.toJson() as INewTask });
    setTaskTitle("");
  }
};

export default inject("userStore")(
  observer(({ userStore, ...rest }) => {
    return <TaskInput userId={userStore.userId} {...rest} />;
  })
);
