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
  const { updateTask } = taskAction.useUpdateTask();

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

  function _renderTask(_task: ITask, _type: string) {
    switch (_type) {
      case "deleted":
        return <DeletedTask task={_task} />;
      case "completedAt":
        return <CompletedTask task={_task} handleCheck={_handleCheck} />;
      default:
        return <TodoTask task={_task} handleCheck={_handleCheck} handleDelete={_handleDelete} />;
    }
  }

  async function _handleCheck(_task: ITask) {
    if (_task.completedAt === 0) {
      _task.completedAt = Date.now();
    } else {
      _task.completedAt = 0;
    }
    if (_task.id) {
      updateTask({ task: _task });
    }
  }

  async function _handleDelete(_task: ITask) {
    _task.deleted = 1;
    if (_task.id) {
      updateTask({ task: _task });
    }
  }
});

interface ITaskProps {
  task: ITask;
  handleCheck?: (task: ITask) => void;
  handleDelete?: (task: ITask) => void;
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
    <Checkbox checked={task.completedAt > 0} onChange={() => handleCheck && handleCheck(task)} />
    <TitleWrapper>{task.title}</TitleWrapper>
  </>
);

export default TaskItem;
