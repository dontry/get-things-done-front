import { DroppableProvided } from 'react-beautiful-dnd';
import styled from 'styled-components';

interface ITaskItemContainerProps extends DroppableProvided {
  isDragging: boolean;
}

// https://github.com/styled-components/styled-components/issues/630
export const TaskItemContainer = styled.div<any>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
  border: ${props => (props.isDragging ? '1px solid #1890ff' : '1px solid #acacac')};
  border-left: ${props => (props.isDragging ? '5px solid #1890ff' : '5px solid #acacac')};
  padding: 10px 8px;
  background-color: #fff;
`;

export const TaskWrapper = styled.span<any>`
  width: 100%;
  margin-left: 0.75rem;
  margin-right: auto;
  a {
    text-decoration: ${props => (props.deleted ? 'line-through' : 'none')};
  }
  * {
    color: ${props => (props.deleted ? '#acacac' : '#1890ff')};
  }
`;

export const TagWrapper = styled.span`
  margin-left: 1rem;
  font-size: 0.8em;
  color: #acacac;
  a {
    color: #acacac;
    &:hover {
      color: #777;
    }
  }
`;

export const TaskContentWrapper = styled.div`
  display: flex;
  align-items: baseline;
  padding-right: 1rem;
`;

export const CloseButton = styled.button`
  width: auto;
  height: auto;
  padding: 0;
  margin-top: -5px;
  margin-right: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  line-height: 1;
`;

export const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TaskListBody = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  min-height: 100px;
`;
