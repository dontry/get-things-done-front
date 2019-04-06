import { Card } from "antd";
import styled from "styled-components";

export const TaskItemContainer = styled.div`
  width: 100%;
  border-radius: 2px;
  margin-bottom: 5px;
`;

export const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 8px;
  border: 1px solid #acacac;
`;

export const TaskListBody = styled.div`
  padding: 8px;
  transition: background-color: 0.2 ease;
  flex-grow: 1;
  min-height: 100px;
`;
