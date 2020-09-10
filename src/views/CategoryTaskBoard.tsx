import { inject, observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { Category } from 'src/types';

import TaskBoard from '../components/TaskBoard';
import { CategoryTaskInput } from '../components/TaskInput';
import { useFetchTasksByCategory } from '../hooks/taskHooks';

const inputVisibleType = ['inbox', 'today', 'tomorrow', 'next', 'someday', 'note'];

interface ICategoryTaskBoard {
  type: string;
  userId: string;
}

const BaseCategoryTaskBoard = ({ type, userId }: ICategoryTaskBoard) => {
  const isTaskInputVisible = useMemo(() => inputVisibleType.includes(type), [type]);

  const { items, isFetching } = useFetchTasksByCategory(type, 'page=1&limit=100');

  return (
    <TaskBoard
      type={type}
      isLoading={isFetching}
      items={items}
      TaskInput={
        isTaskInputVisible && <CategoryTaskInput category={type as Category} userId={userId} />
      }
    />
  );
};

export default inject('userStore')(
  observer(({ userStore, match }) => <BaseCategoryTaskBoard type={match.params.type} userId={userStore.userId} />)
);
