import TaskBoard from '../components/TaskBoard/TaskBoard';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { useFetchTasksByContextId } from '../actions/taskAction';
import { ContextTaskInput } from '../components/TaskInput';

interface IContextTaskBoard {
  contextId: string;
  userId: string;
}

const ContextTaskBoard = ({ contextId, userId }: IContextTaskBoard) => {
  const { items, isFetching } = useFetchTasksByContextId(contextId, 'page=1&limit=100');

  return (
    <TaskBoard
      type={contextId}
      isLoading={isFetching}
      items={items}
      TaskInput={<ContextTaskInput contextId={contextId} userId={userId} />}
    />
  );
};

export default inject('userStore')(
  observer(({ userStore, match }) => {
    return <ContextTaskBoard contextId={match.params.id} userId={userStore.userId} />;
  })
);
