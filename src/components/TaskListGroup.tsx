import React, { memo } from 'react';
import { Collapse, Space } from 'antd';
import { ITask } from 'src/types';
import { TaskList } from './TaskList';
import { capitalize } from 'lodash';

const { Panel } = Collapse;

export interface ITaskListGroup {
  name: string;
  tasks: ITask[];
}

interface ITaskListGroupProps {
  groups: ITaskListGroup[];
}

const TaskListGroup = memo(({ groups }: ITaskListGroupProps) => {
  return (
    <div style={{ padding: '0.5rem' }}>
      <Collapse defaultActiveKey={groups.map(group => group.name)}>
        {groups.map(group => (
          <Panel key={group.name} header={`${capitalize(group.name)} (${group.tasks.length})`}>
            <TaskList type={group.name} tasks={group.tasks} />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
});

export default TaskListGroup;
