import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Checkbox } from "antd";
import { TaskItemContainer, TitleWrapper, CloseButton } from "./style";
import { ITask } from "src/types";
import * as taskAction from "../../actions/taskAction";

interface ITaskItemProps {
  type: string;
  index: number;
  task: ITask;
}

const TaskItem = React.memo(({ type, task, index }: ITaskItemProps) => {
  if (!task.id) {
    return null;
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <TaskItemContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {_renderTask(task, type)}
        </TaskItemContainer>
      )}
    </Draggable>
  );

  function _renderTask(task: ITask, type: string) {
    switch (type) {
      case "deleted":
        return <DeletedTask task={task} />;
      case "completed":
        return <CompletedTask task={task} handleCheck={_handleCheck} />;
      default:
        return <TodoTask task={task} handleCheck={_handleCheck} handleDelete={_handleDelete} />;
    }
  }

  async function _handleCheck(task: ITask) {
    if (task.completed === 0) {
      task.completed = Date.now();
    } else {
      task.completed = 0;
    }
    if (task.id) {
      taskAction.updateTaskById(task.id, task);
    }
  }

  async function _handleDelete(task: ITask) {
    task.deleted = Date.now();
    if (task.id) {
      taskAction.updateTaskById(task.id, task);
    }
  }
});

interface ITaskProps {
  task: ITask;
  handleCheck?(task: ITask): void;
  handleDelete?(task: ITask): void;
}

const TodoTask = ({ task, handleCheck, handleDelete }: ITaskProps) => (
  <>
    <Checkbox onChange={() => handleCheck && handleCheck(task)} />
    <TitleWrapper>{task.title}</TitleWrapper>
    <CloseButton onClick={() => handleDelete && handleDelete(task)}>&times;</CloseButton>
  </>
);

const DeletedTask = ({ task }: ITaskProps) => <TitleWrapper>{task.title}</TitleWrapper>;

const CompletedTask = ({ task, handleCheck }: ITaskProps) => (
  <>
    <Checkbox checked={task.completed > 0} onChange={() => handleCheck && handleCheck(task)} />
    <TitleWrapper>{task.title}</TitleWrapper>
  </>
);

export default TaskItem;
