import React, { memo } from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import { TaskListContainer, TaskListBody } from "./style";
import { mockData } from "./mockData";

interface ITaskListProps {
  list: object;
  index: number;
}

const TaskList: React.FC<ITAskListProps> = ({ list, index = 0 }) => {
  list = mockData;
  const { columns, tasks } = list;
  const id = "list-1";
  return (
    <Droppable droppableId={id} index={index} type="TASK_LIST">
      {provided => (
        <TaskListContainer {...provided.draggableProps} ref={provided.innerRef}>
          <InnerList tasks={tasks} />
        </TaskListContainer>
      )}
    </Droppable>
  );
};

const InnerList = memo(({ tasks }) => {
  return (
    <TaskListBody>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} index={index} />
      ))}
    </TaskListBody>
  );
});

export default TaskList;
