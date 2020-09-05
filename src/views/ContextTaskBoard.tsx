import React from 'react';
import { inject, observer } from 'mobx-react';
import { useFetchTasksByContextId } from '../hooks/taskHooks';
import { groupTasksByCategory } from '../lib/groupTasksByCategory';
import TaskListGroup, { ITaskListGroup } from '../components/TaskListGroup';
import styled from 'styled-components';
import Mask from '../components/Mask';
import { Spin } from 'antd';

const Container = styled.div`
  position: relative;
  background-color: #fff;
  height: 100%;
  overflow: auto;
`;

interface IContextTaskBoard {
  contextId: string;
  userId: string;
}

const ContextTaskBoard = ({ contextId }: IContextTaskBoard) => {
  const { items, isFetching } = useFetchTasksByContextId(contextId, 'page=1&limit=100');
  const taskListGroups = groupTasksByCategory(items) as ITaskListGroup[];

  return (
    <Container>
      {isFetching ? (
        <Mask>
          <Spin size='large' />
        </Mask>
      ) : (
        <TaskListGroup groups={taskListGroups} />
      )}
    </Container>
  );
};

export default inject('userStore')(
  observer(({ userStore, match }) => {
    return <ContextTaskBoard contextId={match.params.id} userId={userStore.userId} />;
  })
);
