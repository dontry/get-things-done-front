import { Checkbox } from 'antd';
import { isNil } from 'lodash';
import moment from 'moment';
import React, { useCallback } from 'react';
import { queryCache } from 'react-query';
import { Link } from 'react-router-dom';
import { IContext, IProject, ITask } from 'src/types';

import { useUpdateTask } from '../../hooks/taskHooks';
import {
  CloseButton,
  TagWrapper,
  TaskContentWrapper,
  TaskItemContainer,
  TaskWrapper
} from './style';

interface ITaskItemProps {
  type: string;
  task: ITask;
  isDragging?: boolean;
}

const TaskItem = React.memo(({ type, task, isDragging }: ITaskItemProps) => {
  const { updateTask } = useUpdateTask();

  const onCheck = useCallback(
    (_task: ITask) => {
      if (_task.completedAt === 0) {
        _task.completedAt = Date.now();
      } else {
        _task.completedAt = 0;
      }
      if (_task.id) {
        updateTask({ task: _task });
      }
    }, [updateTask])

  const onDelete = useCallback(
    (_task: ITask) => {
      _task.deletedAt = 1;
      if (_task.id) {
        updateTask({ task: _task });
      }
    }, [updateTask])

  const renderTask = useCallback((_task: ITask, _type: string) => {
    switch (_type) {
      case 'deleted':
        return <DeletedTask task={_task} />;
      case 'completed':
        return <CompletedTask task={_task} onCheck={onCheck} />;
      default:
        return <TodoTask task={_task} onCheck={onCheck} onDelete={onDelete} />;
    }
  }, [onCheck, onDelete])

  return (
    <TaskItemContainer isDragging={isDragging}>
      {renderTask(task, type)}
    </TaskItemContainer>
  );
});

interface ITaskProps {
  task: ITask;
  onCheck?: (task: ITask) => void;
  onDelete?: (task: ITask) => void;
}

const TodoTask = ({ task, onCheck: handleCheck, onDelete: handleDelete }: ITaskProps) => (
  <>
    <Checkbox onChange={() => handleCheck && handleCheck(task)} />
    <TaskWrapper>
      <TaskContent task={task} />
    </TaskWrapper>
    <CloseButton onClick={() => handleDelete && handleDelete(task)}>&times;</CloseButton>
  </>
);

const DeletedTask = ({ task }: ITaskProps) => (
  <TaskWrapper deleted={true}>
    <TaskContent task={task} />
  </TaskWrapper>
);

const CompletedTask = ({ task, onCheck: handleCheck }: ITaskProps) => (
  <>
    <Checkbox checked={true} onChange={() => handleCheck && handleCheck(task)} />
    <TaskWrapper>
      <TaskContent task={task} />
    </TaskWrapper>
  </>
);

const TaskContent = ({ task }: { task: ITask }) => {
  const contexts = queryCache.getQueryData<IContext[]>('context') || [];
  const context = contexts.find(cxt => cxt.id === task.context);
  const projects = queryCache.getQueryData<IProject[]>('projects') || [];
  const project = projects.find(proj => proj.id === task.projectId);

  const contextTag = isNil(context) ? (
    ''
  ) : (
      <TagWrapper>
        <Link to={`/home/context/${context.id}`}>@{context.name}</Link>
      </TagWrapper>
    );
  const projectTag = isNil(project) ? (
    ''
  ) : (
      <TagWrapper>
        <Link to={`/home/project/${project.id}`}>#{project.title}</Link>
      </TagWrapper>
    );
  const dateTag =
    task.startAt === 0 ? (
      ''
    ) : (
        <TagWrapper style={{ marginLeft: 'auto' }}>{moment(task.startAt).format('DD/MM')}</TagWrapper>
      );

  return (
    <TaskContentWrapper>
      <Link to={`/home/task/${task.id}`}>{task.title}</Link> {contextTag} {projectTag} {dateTag}
    </TaskContentWrapper>
  );
};

export default TaskItem;
