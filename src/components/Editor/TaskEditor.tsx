import {
  ArrowUpOutlined,
  BarsOutlined,
  EnvironmentOutlined,
  ProjectOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { Button, Form, Layout, Select, Space } from 'antd';
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  DraftBlockType,
  DraftEditorCommand,
  DraftHandleValue,
  DraftInlineStyleType,
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import { History } from 'history';
import { get, truncate } from 'lodash';
import { inject, observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { queryCache } from 'react-query';

import { TAGS } from '../../constants/misc';
import { useUpdateTask } from '../../hooks/taskHooks';
import { useValueChange } from '../../hooks/useValueChange';
import { isToday, isTomorrow } from '../../lib/date';
import { Attribute, Category, IContext, IProject, ITask, Priority } from '../../types';
import CategorySelect, { IUpdateCategoryPayload } from './CategorySelect';
import {
  EditorContentWrapper,
  EditorControlWrapper,
  EditorSider,
  EditorTitle,
  EditorWrapper,
} from './style';
import { BlockStyleControls, InlineStyleControls } from './StyleControls';

const { Content, Header } = Layout;

interface ITaskEditorProps {
  task: ITask;
  history: History;
}

const TaskEditor = ({ task, history }: ITaskEditorProps) => {
  const { t } = useTranslation();
  // memo
  const content = get(task, 'note.content');
  const contentState = useMemo(() => {
    if (typeof content === 'string') {
      return ContentState.createFromText(content);
    } else {
      try {
        return convertFromRaw(content);
      } catch (error) {
        return ContentState.createFromText('');
      }
    }
  }, [content]);

  // state
  const [taskAttribute, setAttribute] = useState<Attribute>(task.attribute || 'inbox');
  const [taskTitle, setTitle] = useState(task.title);
  const [taskStartTime, setStartTime] = useState(task.startAt);
  const [taskPriority, onPriorityChange] = useValueChange(task.priority);
  const [taskProject, onProjectChange] = useValueChange(task.projectId);
  const [taskContext, onContextChange] = useValueChange(task.context);
  const [taskTags, onTagsChange] = useValueChange(task.tags);
  const [editorState, setEditorState] = useState(() =>
    contentState ? EditorState.createWithContent(contentState) : EditorState.createEmpty(),
  );
  const projects = queryCache.getQueryData<IProject[]>('projects');
  const contexts = queryCache.getQueryData<IContext[]>('context');
  const editor = useRef(null);

  const taskCategory = useMemo((): Category => {
    if (taskAttribute === 'next') {
      return 'next';
    } else if (taskAttribute === 'plan') {
      if (isToday(taskStartTime)) {
        return 'today';
      } else if (isTomorrow(taskStartTime)) {
        return 'tomorrow';
      } else {
        return 'scheduled';
      }
    } else if (taskAttribute === 'noplan') {
      return 'someday';
    } else {
      return 'inbox';
    }
  }, [taskAttribute, taskStartTime]);

  // hooks
  const { updateTask } = useUpdateTask();

  const onEditorStateChange = useCallback(
    (_editorState: EditorState): void => {
      setEditorState(_editorState);
    },
    [setEditorState],
  );

  const handleKeyCommand = useCallback(
    (command: DraftEditorCommand | string, _editorState: EditorState): DraftHandleValue => {
      const newState = RichUtils.handleKeyCommand(_editorState, command);
      if (newState) {
        onEditorStateChange(_editorState);
        return 'handled';
      } else {
        return 'not-handled';
      }
    },
    [onEditorStateChange],
  );

  const toggleBlockType = useCallback(
    (blockType: DraftBlockType) => {
      onEditorStateChange(RichUtils.toggleBlockType(editorState, blockType));
    },
    [editorState, onEditorStateChange],
  );

  const toggleInlineStyle = useCallback(
    (inlineStyle: DraftInlineStyleType) => {
      onEditorStateChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    },
    [editorState, onEditorStateChange],
  );

  const onCategoryChange = useCallback(
    (payload: IUpdateCategoryPayload) => {
      setAttribute(payload.attribute);
      setStartTime(payload.startTime);
    },
    [setAttribute, setStartTime],
  );

  const handleTitleChange = useCallback(
    (value: string) => {
      setTitle(value);
    },
    [setTitle],
  );

  const onSave = () => {
    const noteContent = convertToRaw(editorState.getCurrentContent());
    const updatedTask: ITask = {
      ...task,
      attribute: taskAttribute,
      title: taskTitle,
      startAt: taskStartTime,
      context: taskContext,
      priority: taskPriority,
      projectId: taskProject,
      tags: taskTags,
      deletedAt: task.deletedAt || 0,
      note: {
        content: noteContent,
      },
    };
    updateTask({ task: updatedTask });
    history.goBack();
  };

  const handleCancel = () => {
    history.goBack();
  };

  const focusEditor = useCallback(() => {
    if (editor.current) {
      // @ts-ignore next-line
      editor.current.focus();
    }
  }, []);

  useEffect(() => {
    focusEditor();
  }, [focusEditor]);

  if (!task) {
    return null;
  }

  return (
    <Form>
      <Layout style={{ padding: '1rem' }}>
        <Header style={{ background: '#f0f2f5', height: '48px', marginTop: '10px' }}>
          <Form.Item style={{ margin: '0 auto' }}>
            <EditorTitle value={taskTitle} onChange={handleTitleChange} />
          </Form.Item>
        </Header>
        <Layout style={{ marginTop: 0 }}>
          <Content style={{ marginTop: '8px' }} onClick={focusEditor}>
            <Form.Item name='note' label='Note'>
              <EditorWrapper>
                <EditorControlWrapper>
                  <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
                  <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
                </EditorControlWrapper>
                <EditorContentWrapper>
                  <Editor
                    ref={editor}
                    handleKeyCommand={handleKeyCommand}
                    editorState={editorState}
                    onChange={setEditorState}
                  />
                </EditorContentWrapper>
              </EditorWrapper>
            </Form.Item>
          </Content>
          <EditorSider style={{ background: '#f0f2f5', margin: '34px 10px 0 5px' }}>
            <Form.Item
              name='category'
              label={
                <span>
                  <BarsOutlined />
                  {t('category')}
                </span>
              }
            >
              <CategorySelect
                initCategory={taskCategory}
                startTime={taskStartTime}
                onChange={onCategoryChange}
              />
            </Form.Item>
            <Form.Item
              name='priority'
              label={
                <span>
                  <ArrowUpOutlined />
                  {t('priority')}
                </span>
              }
              initialValue={taskPriority}
            >
              <Select onChange={onPriorityChange}>
                {Object.keys(Priority)
                  .filter(key => isNaN(Number(key)))
                  .map((priority, index) => (
                    <Select.Option key={priority} value={index + 1}>
                      {t(priority.toLowerCase())}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              name='project'
              label={
                <span>
                  <ProjectOutlined /> {t('project')}
                </span>
              }
              initialValue={taskProject}
            >
              <Select onChange={value => onProjectChange(value as string)}>
                {projects &&
                  projects.map(project => (
                    <Select.Option title={project.title} value={project.id || ''}>
                      {truncate(project.title, { length: 10 })}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='context'
              label={
                <span>
                  <EnvironmentOutlined />
                  {t('context')}
                </span>
              }
              initialValue={taskContext}
            >
              <Select onChange={value => onContextChange(value as string)}>
                {contexts &&
                  contexts.map((cxt: IContext) => (
                    <Select.Option value={cxt.id || ''}>{cxt.name}</Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='tags'
              label={
                <span>
                  <TagOutlined />
                  {t('tags')}
                </span>
              }
              initialValue={taskTags}
            >
              <Select mode='multiple' placeholder={t('add_tag')} onChange={onTagsChange}>
                {TAGS.map(tag => (
                  <Select.Option value={tag}>{tag}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            {/* <Form.Item
              label={
                <span>
                  <BellOutlined /> Reminders
                </span>
              }
            >
              <Input />
            </Form.Item> */}
          </EditorSider>
        </Layout>
      </Layout>
      <Layout.Footer style={{ textAlign: 'right' }}>
        <Space>
          <Button type='primary' onClick={onSave}>
            {t('save')}
          </Button>
          <Button onClick={handleCancel}>{t('cancel')}</Button>
        </Space>
      </Layout.Footer>
    </Form>
  );
};

export default inject('taskStore')(
  observer(({ taskStore, match, history }) => {
    const taskId = match.params.id;
    const task = taskStore.getTaskById(taskId);
    return <TaskEditor task={task} history={history} />;
  }),
);
