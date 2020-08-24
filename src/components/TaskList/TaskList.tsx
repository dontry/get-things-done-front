import React, { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';
import { TaskListContainer, TaskListBody } from './style';
import { ITask } from 'src/types';

interface ITaskListProps {
  id: string;
  tasks: ITask[];
  index?: number;
  category: string;
}

const TaskList = ({ id, tasks, category }: ITaskListProps) => {
  return (
    <Droppable droppableId={id} type={category}>
      {provided => (
        <TaskListContainer {...provided.droppableProps} ref={provided.innerRef}>
          <InnerList category={category} tasks={tasks} />
        </TaskListContainer>
      )}
    </Droppable>
  );
};

interface IInnerListProps {
  category: string;
  tasks: ITask[];
}

const InnerList = memo(({ tasks, category: type }: IInnerListProps) => {
  return (
    <TaskListBody>
      {tasks.map((task, index) => (
        <TaskItem type={type} key={task.id} task={task} index={index} />
      ))}
    </TaskListBody>
  );
});

export default TaskList;
