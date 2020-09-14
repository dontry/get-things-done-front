import { Collapse } from 'antd';
import { capitalize } from 'lodash';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ITask } from 'src/types';

import { TaskList } from '../TaskList';
import { StyledCollapse } from './style';

const { Panel } = Collapse;

interface ITaskListGroupProps {
  groups: ITaskListGroup[];
}

export interface ITaskListGroup {
  name: string;
  tasks: ITask[];
}

export const TaskListGroup = memo(({ groups }: ITaskListGroupProps) => {
  const { t } = useTranslation();
  if (groups.length === 0) {
    return <div>Empty list</div>;
  }

  return (
    <div style={{ padding: '0.5rem' }}>
      <StyledCollapse defaultActiveKey={groups.map(group => group.name)}>
        {groups.length > 0 &&
          groups.map(group => (
            <Panel key={group.name} header={`${t(group.name)} (${group.tasks.length})`}>
              <TaskList type={group.name} tasks={group.tasks} />
            </Panel>
          ))}
      </StyledCollapse>
    </div>
  );
});
