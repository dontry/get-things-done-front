import { match as Match } from 'react-router';
import { queryCache } from 'react-query';
import { IProject } from 'src/types';
import { useMemo } from 'react';
import React from 'react';
import { Form, Layout, Spin, Checkbox, Space } from 'antd';
import { EditorTitle } from './Editor/style';
import { useValueChange } from '../hooks/useValueChange';
import Mask from './Mask';
import TaskList from './TaskList';
import * as taskAction from '../hooks/taskHooks';
import { DragDropContext } from 'react-beautiful-dnd';
import { CategoryTaskInput } from './TaskInput';

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

  if (!project) {
    return null;
  }

  const [title, handleTitleChange] = useValueChange(project ? project.title : '');
  const { items, isFetching } = taskAction.useFetchTasksByProjectId(projectId);

  function onDragEnd(result: object): void {
    const { destination, source, draggableId, type }: any = result;
    // If destination is not a droppable area
    if (!destination) {
      return;
    }
    // If the draggable object not move
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    // TODO: reorder list
    // list.splice(source.index, 1);
    // list.splice(destination.index, 0, draggableId);
  }

  return (
    <Layout style={{ background: '#fff', height: '100%', overflow: 'auto' }}>
      <Header style={{ background: '#fff', height: 'auto', marginTop: '2rem', paddingLeft: '1em' }}>
        <div style={{ margin: '0 auto', display: 'flex', alignItems: 'center' }}>
          <Form.Item style={{ marginBottom: '1rem' }}>
            <Space>
              <Checkbox />
              <EditorTitle value={title} onChange={handleTitleChange} align='left' />
            </Space>
          </Form.Item>
        </div>
      </Header>
      <CategoryTaskInput category='inbox' projectId={projectId} userId={userId} />
      <DragDropContext onDragEnd={onDragEnd}>
        {isFetching ? (
          <Mask>
            <Spin size='large' />
          </Mask>
        ) : (
          <TaskList id={projectId} type={projectId} tasks={items} />
        )}
      </DragDropContext>
    </Layout>
  );
};

export default ProjectBoard;
