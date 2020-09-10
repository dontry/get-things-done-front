import { EditorState } from 'draft-js';
import React from 'react';
import styled from 'styled-components';

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' }
];

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' }
];

const ControlWrapper = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  margin-bottom: 5px;
  user-select: none;
`;

interface IStyleButtonProps {
  active: boolean;
}

const ControlButton = styled.button`
  color: ${(props: IStyleButtonProps) => (props.active ? '#5890ff' : '#999')};
  cursor: pointer;
  margin-right: 16px;
  padding: 2px 0;
  display: inline-block;
  border: none;
  outline: none;
`;

interface IControlProps {
  editorState: EditorState;
  onToggle(style: string): void;
}

const BlockStyleControls = ({ editorState, onToggle }: IControlProps) => {
  // const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <ControlWrapper>
      {BLOCK_TYPES.map(type => (
        <ControlButton
          key={type.label}
          active={type.style === blockType}
          onMouseDown={() => onToggle(type.style)}
        >
          {type.label}
        </ControlButton>
      ))}
    </ControlWrapper>
  );
};

const InlineStyleControls = ({ editorState, onToggle }: IControlProps) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <ControlWrapper>
      {INLINE_STYLES.map(type => (
        <ControlButton
          key={type.label}
          active={type.style === blockType}
          onMouseDown={() => onToggle(type.style)}
        >
          {type.label}
        </ControlButton>
      ))}
    </ControlWrapper>
  );
};

export { BlockStyleControls, InlineStyleControls };
