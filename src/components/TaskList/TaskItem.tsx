import React from 'react';
import { Checkbox } from 'antd';
import {
  TaskItemContainer,
  TaskWrapper,
  CloseButton,
  TagWrapper,
  TaskContentWrapper
} from './style';
import { ITask, IContext, IProject } from 'src/types';
import { Link } from 'react-router-dom';
import { useUpdateTask } from '../../hooks/taskHooks';
import { isNil } from 'lodash';
import { queryCache } from 'react-query';
import moment from 'moment';

interface ITaskItemProps {
  type: string;
  task: ITask;
  isDragging?: boolean;
}

const TaskItem = React.memo(({ type, task, isDragging }: ITaskItemProps) => {
  if (!task.id) {
    return null;
  }
  const { updateTask } = useUpdateTask();

  return <TaskItemContainer isDragging={isDragging}>{_renderTask(task, type)}</TaskItemContainer>;

  function _renderTask(_task: ITask, _type: string) {
    switch (_type) {
      case 'deleted':
        return <DeletedTask task={_task} />;
      case 'completed':
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
    _task.deletedAt = 1;
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

const CompletedTask = ({ task, handleCheck }: ITaskProps) => (
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
