import React, { memo } from 'react';
import { TimeBasedProperty, ITask } from 'src/types';
import { groupTasksByDate } from '../lib/groupTasksByDate';
import TaskListGroup, { ITaskListGroup } from './TaskListGroup';
import { getScheduledGroupTasks } from '../lib/getScheduledTaskGroups';

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
