import React, { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskItemContainer } from "./style";

interface ITaskItemProps {
  index: string;
  task: ITask;
}

const TaskItem = memo(({ task, index }) => {
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
          {this.props.task.title}
        </TaskItemContainer>
      )}
    </Draggable>
  );
});

export default TaskItem;
