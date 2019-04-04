import React, { useState, PureComponent, createRef } from "react";
import { Form, Input, Menu, Dropdown, Icon, Select, DatePicker, Calendar, Layout } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { formItemLayout } from "../../constants/layout";

import {
  Editor,
  EditorState,
  RichUtils,
  DraftEditorCommand,
  DraftBlockType,
  DraftInlineStyle,
  DraftInlineStyleType,
  DraftHandleValue
} from "draft-js";
import {
  EditorWrapper,
  EditorControlWrapper,
  EditorTitle,
  SelectWrapper,
  CalendarWrapper,
  EditorSider,
  EditorContentWrapper
} from "./style";
import { BlockStyleControls, InlinStyleControls } from "./StyleControls";
import { Task, Priority } from "../../types";
import { SIDEBAR_OPTIONS, CONTEXT, TAGS } from "../../constants/misc";
import { captialize } from "../../lib/capitalize";
import moment from "moment";

const MAX_DEPTH = 4;
const { Content, Header } = Layout;

interface ICategorySelectProps {
  value?: string;
  onChange(value: string): void;
}

interface ICategorySelectState {
  open: boolean;
}

class CategorySelect extends PureComponent<ICategorySelectProps, ICategorySelectState> {
  private static defaultProps = {
    value: SIDEBAR_OPTIONS[0]
  };

  public state = {
    open: false
  };

  private select: Select<string> | null = null;

  public _handleChange = (value: string): void => {
    this.props.onChange(value);
    if (value !== "scheduled") {
      this.setState({ open: false });
      this.select!.blur();
    }
  };

  public _handleFocus = () => {
    this.setState({ open: true });
  };

  public _handleBlur = () => {
    this.setState({ open: false });
  };

  public _handleCalendarChange = (date?: moment.Moment) => {
    if (date) {
      const timestamp: number = date.unix();
      console.log("timestamp:", timestamp);
    }
  };

  public render() {
    const { value } = this.props;
    const { open } = this.state;
    console.log("value:", value);
    return (
      <SelectWrapper>
        <Select
          ref={dom => {
            this.select = dom;
          }}
          defaultValue="inbox"
          open={open}
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
          onChange={this._handleChange}
        >
          {SIDEBAR_OPTIONS.map(option => (
            <Select.Option value={option}>{captialize(option)}</Select.Option>
          ))}
        </Select>
        {value === "scheduled" && (
          <CalendarWrapper>
            <Calendar fullscreen={false} onChange={this._handleCalendarChange} />
          </CalendarWrapper>
        )}
      </SelectWrapper>
    );
  }
}

const TaskEditor: React.FC<Task & FormComponentProps> = ({ title }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [taskCategory, setTaskCategory] = useState("inbox");

  const _onEditorStateChange = (_editorState: EditorState): void => {
    setEditorState(_editorState);
  };

  const _handleKeyCommand = (
    command: DraftEditorCommand | string,
    _editorState: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(_editorState, command);
    if (newState) {
      _onEditorStateChange(_editorState);
      return "handled";
    } else {
      return "not-handled";
    }
  };

  const _mapKeyToEditorCommand = (e: React.KeyboardEvent<{}>) => {
    if (e.keyCode === 9) {
      const newEditorState: EditorState = RichUtils.onTab(e, editorState, MAX_DEPTH);
      if (newEditorState !== editorState) {
        _onEditorStateChange(newEditorState);
      }
    }
  };

  const _toggleBlockType = (blockType: DraftBlockType) => {
    _onEditorStateChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const _toggleInlinStyle = (inlineStyle: DraftInlineStyleType) => {
    _onEditorStateChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const _onInputChange = (value: string) => {
    setTaskCategory(value);
  };

  return (
    <Form>
      <Layout>
        <Header style={{ background: "#f0f2f5", height: "48px", marginTop: "10px" }}>
          <Form.Item style={{ margin: "0 auto" }}>
            <EditorTitle value={title} />
          </Form.Item>
        </Header>
        <Layout style={{ marginTop: 0 }}>
          <Content style={{ padding: "0 10px", marginTop: "8px" }}>
            <Form.Item label="Note">
              <EditorWrapper>
                <EditorControlWrapper>
                  <BlockStyleControls editorState={editorState} onToggle={_toggleBlockType} />
                  <InlinStyleControls editorState={editorState} onToggle={_toggleInlinStyle} />
                </EditorControlWrapper>
                <EditorContentWrapper>
                  <Editor
                    handleKeyCommand={_handleKeyCommand}
                    editorState={editorState}
                    onChange={setEditorState}
                  />
                </EditorContentWrapper>
              </EditorWrapper>
            </Form.Item>
          </Content>
          <EditorSider style={{ background: "#f0f2f5", margin: "34px 10px 0 5px" }}>
            <Form.Item
              label={
                <span>
                  <Icon type="bars" /> Category
                </span>
              }
            >
              <CategorySelect value={taskCategory} onChange={_onInputChange} />
            </Form.Item>
            <Form.Item
              label={
                <span>
                  <Icon type="arrow-up" /> Priority
                </span>
              }
            >
              <Select defaultValue={3}>
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
                  <Icon type="environment" /> Context
                </span>
              }
            >
              <Select>
                {CONTEXT.map(context => (
                  <Select value={context}>{context}</Select>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={
                <span>
                  <Icon type="tag" /> Tags
                </span>
              }
            >
              <Select mode="multiple" placeholder="Add label">
                {TAGS.map(tag => (
                  <Select.Option value={tag}>{tag}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={
                <span>
                  <Icon type="bell" /> Reminders
                </span>
              }
            >
              <Input />
            </Form.Item>
          </EditorSider>
        </Layout>
      </Layout>
    </Form>
  );
};

export default TaskEditor;
