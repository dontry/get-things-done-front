import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ITask } from 'src/types';
import TaskItem from './TaskItem';
import { TaskItemContainer } from './style';

interface ITaskItemProps {
  type: string;
  index: number;
  task: ITask;
}

const DraggableTaskItem = React.memo(({ type, task, index }: ITaskItemProps) => {
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
        >
          <TaskItem type={type} task={task} isDragging={snapshot.isDragging} />
        </TaskItemContainer>
      )}
    </Draggable>
  );
});

export default DraggableTaskItem;
