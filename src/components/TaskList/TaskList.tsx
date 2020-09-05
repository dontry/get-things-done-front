import React, { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';
import { TaskListContainer, TaskListBody } from './style';
import { ITask } from 'src/types';

interface ITaskListProps {
  id: string;
  tasks: ITask[];
  index?: number;
  type: string;
}

const TaskList = ({ id, tasks, type }: ITaskListProps) => {
  return (
    <Droppable droppableId={id} type={type}>
      {provided => (
        <TaskListContainer {...provided.droppableProps} ref={provided.innerRef}>
          <InnerList type={type} tasks={tasks} />
        </TaskListContainer>
      )}
    </Droppable>
  );
};

interface IInnerListProps {
  type: string;
  tasks: ITask[];
}

const InnerList = memo(({ tasks, type }: IInnerListProps) => {
  return (
    <TaskListBody>
      {tasks.map((task, index) => (
        <TaskItem type={type} key={task.id} task={task} index={index} />
      ))}
    </TaskListBody>
  );
});

export default TaskList;
