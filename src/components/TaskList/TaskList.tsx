import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import { TaskListContainer, TaskListBody } from "./style";
import { mockData } from "./mockData";
import { ITask } from "src/types";

interface ITaskListProps {
  list?: ITaskList;
  index?: number;
  type: string;
}

interface ITaskList {
  id: string;
  title: string;
  taskIds: string[];
}

const TaskList: React.FC<ITaskListProps> = ({ index = 0 }) => {
  const list: ITaskList = mockData.columns["column-1"];
  const { id, taskIds, title } = list;
  const _tasks: any = taskIds.map(_id => mockData.tasks[_id]);

  return (
    <Droppable droppableId={id} type="TASK_LIST">
      {provided => (
        <TaskListContainer {...provided.droppableProps} ref={provided.innerRef}>
          <InnerList tasks={_tasks} />
        </TaskListContainer>
      )}
    </Droppable>
  );
};

interface IInnerListProps {
  tasks: ITask[];
}

const InnerList: React.FC<IInnerListProps> = React.memo(({ tasks }) => {
  return (
    <TaskListBody>
      {tasks.map((task, index) => (
        <TaskItem key={task.id} task={task} index={index} />
      ))}
    </TaskListBody>
  );
});

export default TaskList;
