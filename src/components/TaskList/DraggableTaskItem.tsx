import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ITask } from 'src/types';
import TaskItem from './TaskItem';
import { DraggableTaskItemContainer } from './style';

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
        <DraggableTaskItemContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <TaskItem type={type} task={task} isDragging={snapshot.isDragging} />
        </DraggableTaskItemContainer>
      )}
    </Draggable>
  );
});

export default DraggableTaskItem;
