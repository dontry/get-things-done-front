import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TaskListContainer } from './style';
import { ITask } from 'src/types';
import TaskList from './TaskList';

interface ITaskListProps {
  id: string;
  tasks: ITask[];
  index?: number;
  type: string;
}

const DroppableTaskList = ({ id, tasks, type }: ITaskListProps) => {
  return (
    <Droppable droppableId={id} type={type}>
      {provided => (
        <TaskListContainer {...provided.droppableProps} ref={provided.innerRef}>
          <TaskList type={type} tasks={tasks} />
        </TaskListContainer>
      )}
    </Droppable>
  );
};

export default DroppableTaskList;
