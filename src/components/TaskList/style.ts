import React from "react";
import { Card } from "antd";
import { DroppableProvided } from "react-beautiful-dnd";
import styled, { StyledFunction } from "styled-components";

interface ITaskItemContainerProps extends DroppableProvided {
  isDragging: boolean;
}

export const TaskItemContainer = styled.div<any>`
  width: 100%;
  margin-bottom: 8px;
  border: 1px solid #acacac;
  border-left: 5px solid #acacac;
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
  margin: 8px;
  border: 1px solid #acacac;
`;

export const TaskListBody = styled.div`
  padding: 8px;
  transition: background-color: 0.2 ease;
  flex-grow: 1;
  min-height: 100px;
`;
