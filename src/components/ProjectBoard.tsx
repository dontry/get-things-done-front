import { Checkbox, Form, Layout, Space,Spin } from 'antd';
import { useMemo } from 'react';
import React from 'react';
import { queryCache } from 'react-query';
import { match as Match } from 'react-router';
import { IProject } from 'src/types';

import * as taskAction from '../hooks/taskHooks';
import { useValueChange } from '../hooks/useValueChange';
import { groupTasksByCategory } from '../lib/groupTasksByCategory';
import { EditorTitle } from './Editor/style';
import Mask from './Mask';
import { CategoryTaskInput } from './TaskInput';
import TaskListGroup, { ITaskListGroup } from './TaskListGroup';

const { Header } = Layout;

interface IProjectEditorProps {
  match: Match<{ id: string }>;
  userId: string;
}

const ProjectBoard = ({ match, userId }: IProjectEditorProps) => {
  const projectId = match.params.id;
  const project = useMemo(() => {
    const projects = (queryCache.getQueryData('projects') as IProject[]) || [];
    return projects.find(_project => _project.id === projectId);
  }, [projectId]);
  const [title, onTitleChange] = useValueChange(project ? project.title : '');
  const { items, isFetching } = taskAction.useFetchTasksByProjectId(projectId);
  const taskListGroups = groupTasksByCategory(items) as ITaskListGroup[];
  
  if (!project) {
    return null;
  }

  return (
    <Layout style={{ background: '#fff', height: '100%', overflow: 'auto' }}>
      <Header style={{ background: '#fff', height: 'auto', marginTop: '2rem', paddingLeft: '1em' }}>
        <div style={{ margin: '0 auto', display: 'flex', alignItems: 'center' }}>
          <Form.Item style={{ marginBottom: '1rem' }}>
            <Space>
              <Checkbox />
              <EditorTitle value={title} onChange={onTitleChange} align='left' />
            </Space>
          </Form.Item>
        </div>
      </Header>
      <CategoryTaskInput category='inbox' projectId={projectId} userId={userId} />
      <>
        {isFetching ? (
          <Mask>
            <Spin size='large' />
          </Mask>
        ) : (
          <TaskListGroup groups={taskListGroups} />
        )}
      </>
    </Layout>
  );
};

export default ProjectBoard;
