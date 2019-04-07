import React from "react";
import { RouteComponentProps } from "react-router";
import { Layout,Form, Input } from "antd";
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
      <Form>
        <Layout style={{
  backgroundColor: "#fff"
        }}>
          <Form.Item style={{margin: "16px 8px"}}>
            <Input placeholder="Add a new task"/>
          </Form.Item>
        </Layout>
      </Form>
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskList type="today" />
      </DragDropContext>
    </Container>
  );
};

export default TaskBoard;
