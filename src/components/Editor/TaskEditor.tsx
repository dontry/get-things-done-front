import React, { useState, PureComponent, createRef } from "react";
import {
  Form,
  Input,
  Menu,
  Dropdown,
  Icon,
  Select,
  DatePicker,
  Calendar
} from "antd";
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
  CategorySelectWrapper,
  CalendarWrapper
} from "./style";
import { BlockStyleControls, InlinStyleControls } from "./StyleControls";
import { Task } from "../../types";
import { SIDEBAR_OPTIONS } from "../../constants/misc";
import { captialize } from "../../lib/capitalize";
import moment from "moment";

const MAX_DEPTH = 4;

interface CategorySelectProps {
  value?: string;
  onChange(value: string): void;
}

interface CategorySelectState {
  open: boolean;
}

class CategorySelect extends PureComponent<
  CategorySelectProps,
  CategorySelectState
> {
  static defaultProps = {
    value: SIDEBAR_OPTIONS[0]
  };

  state = {
    open: false
  };

  private select: Select<string> | null = null;

  _handleChange = (value: string): void => {
    this.props.onChange(value);
    if (value !== "scheduled") {
      this.setState({ open: false });
      this.select!.blur();
    }
  };

  _handleFocus = () => {
    this.setState({ open: true });
  };

  _handleBlur = () => {
    this.setState({ open: false });
  };

  _handleCalendarChange = (date?: moment.Moment) => {
    if (date) {
      const timestamp: number = date.unix();
      console.log("timestamp:", timestamp);
    }
  };

  render() {
    const { value } = this.props;
    const { open } = this.state;
    console.log("value:", value);
    return (
      <CategorySelectWrapper>
        <Select
          ref={dom => {
            this.select = dom;
          }}
          defaultValue="inbox"
          open={open}
          style={{ width: 120 }}
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
            <Calendar
              fullscreen={false}
              onChange={this._handleCalendarChange}
            />
          </CalendarWrapper>
        )}
      </CategorySelectWrapper>
    );
  }
}

const TaskEditor: React.FC<Task & FormComponentProps> = ({ title }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [taskCategory, setTaskCategory] = useState("inbox");

  const _onEditorStateChange = (editorState: EditorState): void => {
    setEditorState(editorState);
  };

  const _handleKeyCommand = (
    command: DraftEditorCommand | string,
    editorState: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      _onEditorStateChange(editorState);
      return "handled";
    } else {
      return "not-handled";
    }
  };

  const _mapKeyToEditorCommand = (e: React.KeyboardEvent<{}>) => {
    if (e.keyCode == 9) {
      const newEditorState: EditorState = RichUtils.onTab(
        e,
        editorState,
        MAX_DEPTH
      );
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
      <Form.Item>
        <EditorTitle value={title} />
      </Form.Item>
      <EditorWrapper>
        <EditorControlWrapper>
          <BlockStyleControls
            editorState={editorState}
            onToggle={_toggleBlockType}
          />
          <InlinStyleControls
            editorState={editorState}
            onToggle={_toggleInlinStyle}
          />
        </EditorControlWrapper>
        <Editor
          handleKeyCommand={_handleKeyCommand}
          editorState={editorState}
          onChange={setEditorState}
        />
      </EditorWrapper>
      <Form.Item>
        <CategorySelect value={taskCategory} onChange={_onInputChange} />
      </Form.Item>
    </Form>
  );
};

export default TaskEditor;
