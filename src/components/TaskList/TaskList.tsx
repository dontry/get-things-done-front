import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import { TaskListContainer, TaskListBody } from "./style";
import { mockData } from "./mockData";
import { ITask } from "src/types";

interface ITaskListProps {
  id: string;
  tasks: ITask[];
  index?: number;
  type: string;
}

const TaskList = ({ id, tasks,  index = 0, type }: ITaskListProps) => {
  debugger;
  return (
    <Droppable droppableId={id} type={type}>
      {provided => (
        <TaskListContainer {...provided.droppableProps} ref={provided.innerRef}>
          <InnerList tasks={tasks} />
        </TaskListContainer>
      )}
    </Droppable>
  );
};

interface IInnerListProps {
  tasks: ITask[];
}

const InnerList = React.memo(({ tasks }: IInnerListProps) => {
  return (
    <TaskListBody>
      {tasks.map((task, index) => (
        <TaskItem key={task.id} task={task} index={index} />
      ))}
    </TaskListBody>
  );
});

export default TaskList;
