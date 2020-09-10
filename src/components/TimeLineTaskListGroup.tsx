import React, { memo } from 'react';
import { ITask,TimeBasedProperty } from 'src/types';

import { getScheduledGroupTasks } from '../lib/getScheduledTaskGroups';
import { groupTasksByDate } from '../lib/groupTasksByDate';
import TaskListGroup, { ITaskListGroup } from './TaskListGroup';

interface ITimeLineTaskListGroupProps {
  tasks: ITask[];
  type: string;
}

export const TimeLineTaskListGroup = memo(({ tasks, type }: ITimeLineTaskListGroupProps) => {
  let taskListGroups: ITaskListGroup[] = [];
  if (type === 'scheduled') {
    taskListGroups = getScheduledGroupTasks(tasks);
  } else {
    const timeBasedProperty = `${type}At` as TimeBasedProperty;
    taskListGroups = groupTasksByDate(tasks, timeBasedProperty);
  }

  return <TaskListGroup groups={taskListGroups} />;
});
