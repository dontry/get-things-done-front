import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import { TaskListContainer, TaskListBody } from "./style";
import { mockData } from "./mockData";
import { ITask } from "src/types";

interface ITaskListProps {
  id: string;
  list: string[];
  index?: number;
  type: string;
}

const TaskList = ({ id, list,  index = 0 }: ITaskListProps) => {
  const tasks: ITask[] = list.map(_id => mockData.tasks[_id]);

  return (
    <Droppable droppableId={id} type="TASK_LIST">
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
