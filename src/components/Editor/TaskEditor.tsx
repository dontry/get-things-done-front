import React, { useState } from "react";
import { Form, Input } from "antd";
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
import { EditorWrapper, EditorControlWrapper, EditorTitle } from "./style";
import { BlockStyleControls, InlinStyleControls } from "./StyleControls";

const { Item } = Form;
const MAX_DEPTH = 4;

interface EditorProps {
  title: string;
}

const TaskEditor: React.FC<EditorProps & FormComponentProps> = ({ title }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const _onChange = (editorState: EditorState): void => {
    setEditorState(editorState);
  };

  const _handleKeyCommand = (
    command: DraftEditorCommand | string,
    editorState: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      _onChange(editorState);
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
        _onChange(newEditorState);
      }
    }
  };

  const _toggleBlockType = (blockType: DraftBlockType) => {
    _onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const _toggleInlinStyle = (inlineStyle: DraftInlineStyleType) => {
    _onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  return (
    <Form>
      <Item>
        <EditorTitle value={title} />
      </Item>
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
    </Form>
  );
};

export default TaskEditor;
