import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Checkbox } from "antd";
import { TaskItemContainer, TitleWrapper } from "./style";
import { ITask } from "src/types";

interface ITaskItemProps {
  index: number;
  task: ITask;
}

const TaskItem = React.memo(({ task, index }: ITaskItemProps) => {
  const { title, id } = task;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <TaskItemContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Checkbox />
          <TitleWrapper>{title}</TitleWrapper>
        </TaskItemContainer>
      )}
    </Draggable>
  );
});

export default TaskItem;
