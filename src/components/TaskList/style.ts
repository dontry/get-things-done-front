import React from "react";
import { Card } from "antd";
import { DroppableProvided } from "react-beautiful-dnd";
import styled, { StyledFunction } from "styled-components";

interface ITaskItemContainerProps extends DroppableProvided {
  isDragging: boolean;
}

// https://github.com/styled-components/styled-components/issues/630
export const TaskItemContainer = styled.div<any>`
  width: 100%;
  margin-bottom: 8px;
  border: ${props => (props.isDragging ? "1px solid #1890ff" : "1px solid #acacac")};
  border-left: ${props => (props.isDragging ? "5px solid #1890ff" : "5px solid #acacac")};
  padding: 10px 8px;
  background-color: #fff;
`;

export const TitleWrapper = styled.span`
  margin-left: 5px;
`;

export const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TaskListBody = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
`;
