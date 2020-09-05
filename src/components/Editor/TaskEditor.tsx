import React, { useState, useMemo, useCallback } from 'react';
import { Form, Select, Layout, Button, Space } from 'antd';
import { BarsOutlined, EnvironmentOutlined, ArrowUpOutlined, TagOutlined } from '@ant-design/icons';
import {
  Editor,
  EditorState,
  RichUtils,
  DraftEditorCommand,
  DraftBlockType,
  DraftInlineStyleType,
  DraftHandleValue,
  convertToRaw,
  ContentState,
  convertFromRaw
} from 'draft-js';
import {
  EditorWrapper,
  EditorControlWrapper,
  EditorTitle,
  EditorSider,
  EditorContentWrapper
} from './style';
import { BlockStyleControls, InlineStyleControls } from './StyleControls';
import { ITask, Priority, Category, Attribute, IContext } from '../../types';
import { TAGS } from '../../constants/misc';
import { queryCache } from 'react-query';
import { observer, inject } from 'mobx-react';
import { useUpdateTask } from '../../hooks/taskHooks';
import { useValueChange } from '../../hooks/useValueChange';
import { History } from 'history';
import { get } from 'lodash';
import CategorySelect, { IUpdateCategoryPayload } from './CategorySelect';
import { isTomorrow, isToday } from '../../lib/date';

const { Content, Header } = Layout;

interface ITaskEditorProps {
  task?: ITask;
  history: History;
}

const TaskEditor = ({ task, history }: ITaskEditorProps) => {
  if (!task) {
    return null;
  }
  // memo
  const contentState = useMemo(() => {
    const content = get(task, 'note.content');
    if (typeof content === 'string') {
      return ContentState.createFromText(content);
    } else {
      try {
        return convertFromRaw(content);
      } catch (error) {
        return ContentState.createFromText('');
      }
    }
  }, [get(task, 'note.content', '')]);

  // state
  const [taskAttribute, setAttribute] = useState<Attribute>(task.attribute || 'inbox');
  const [taskTitle, setTitle] = useState(task.title);
  const [taskStartTime, setStartTime] = useState(task.startAt);
  const [taskPriority, handlePriorityChange] = useValueChange(task.priority);
  const [taskContext, handleContextChange] = useValueChange(task.context);
  const [taskTags, handleTagsChange] = useValueChange(task.tags);
  const [editorState, setEditorState] = useState(() =>
    contentState ? EditorState.createWithContent(contentState) : EditorState.createEmpty()
  );
  const context = queryCache.getQueryData<IContext[]>('context');

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

  // hook
  const { updateTask } = useUpdateTask();

  const onEditorStateChange = useCallback(
    (_editorState: EditorState): void => {
      setEditorState(_editorState);
    },
    [setEditorState]
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
    [onEditorStateChange]
  );

  const toggleBlockType = useCallback(
    (blockType: DraftBlockType) => {
      onEditorStateChange(RichUtils.toggleBlockType(editorState, blockType));
    },
    [editorState]
  );

  const toggleInlineStyle = useCallback(
    (inlineStyle: DraftInlineStyleType) => {
      onEditorStateChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    },
    [editorState]
  );

  const handleCategoryChange = useCallback(
    (payload: IUpdateCategoryPayload) => {
      setAttribute(payload.attribute);
      setStartTime(payload.startTime);
    },
    [setAttribute, setStartTime]
  );

  const handleTitleChange = useCallback(
    (value: string) => {
      setTitle(value);
    },
    [setTitle]
  );

  const handleSave = () => {
    const content = convertToRaw(editorState.getCurrentContent());
    const updatedTask: ITask = {
      ...task,
      attribute: taskAttribute,
      title: taskTitle,
      startAt: taskStartTime,
      context: taskContext,
      priority: taskPriority,
      tags: taskTags,
      note: {
        content
      }
    };
    updateTask({ task: updatedTask });
    history.goBack();
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <Form>
      <Layout style={{ padding: '1rem' }}>
        <Header style={{ background: '#f0f2f5', height: '48px', marginTop: '10px' }}>
          <Form.Item style={{ margin: '0 auto' }}>
            <EditorTitle value={taskTitle} onChange={handleTitleChange} />
          </Form.Item>
        </Header>
        <Layout style={{ marginTop: 0 }}>
          <Content style={{ marginTop: '8px' }}>
            <Form.Item label='Note'>
              <EditorWrapper>
                <EditorControlWrapper>
                  <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
                  <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
                </EditorControlWrapper>
                <EditorContentWrapper>
                  <Editor
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
              label={
                <span>
                  <BarsOutlined /> Category
                </span>
              }
            >
              <CategorySelect
                initCategory={taskCategory}
                startTime={taskStartTime}
                onChange={handleCategoryChange}
              />
            </Form.Item>
            <Form.Item
              label={
                <span>
                  <ArrowUpOutlined /> Priority
                </span>
              }
            >
              <Select defaultValue={taskPriority} onChange={handlePriorityChange}>
                {Object.keys(Priority)
                  .filter(key => isNaN(Number(key)))
                  .map((priority, index) => (
                    <Select.Option value={index + 1}>{priority}</Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={
                <span>
                  <EnvironmentOutlined /> Context
                </span>
              }
            >
              <Select defaultValue={taskContext} onChange={handleContextChange}>
                {context &&
                  context.map((cxt: IContext) => (
                    <Select.Option value={cxt.id || ''}>{cxt.name}</Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={
                <span>
                  <TagOutlined /> Tags
                </span>
              }
            >
              <Select
                mode='multiple'
                placeholder='Add label'
                defaultValue={taskTags}
                onChange={handleTagsChange}
              >
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
          <Button type='primary' onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
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
  })
);
