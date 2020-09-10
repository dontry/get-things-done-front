import React, {
  Component,
  ComponentClass,
  createRef,
  SyntheticEvent,
  useRef,
  useCallback,
  useState,
  useMemo,
} from 'react';

interface IEditableProps {
  value: string;
  align?: string;
  isAllowedEmpty?: boolean;
  editOnClick?: boolean;
  onChange?(value: string): void;
}

// https://stackoverflow.com/questions/31815633/what-does-the-error-jsx-element-type-does-not-have-any-construct-or-call
const Editable = (WrappedComponent: ComponentClass<any> | string) => {
  return ({ value, isAllowedEmpty, editOnClick, onChange, ...rest }: IEditableProps) => {
    const [editing, setEditing] = useState(false);
    // https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315
    const editableRef = useRef<HTMLElement>(null);

    const edit = useCallback(
      (e: SyntheticEvent) => {
        e.stopPropagation();
        setEditing(true);
        editableRef.current?.focus();
      },
      [setEditing, editableRef],
    );

    const save = useCallback(() => {
      setEditing(false);

      const node = editableRef.current;
      const textContent = node?.textContent!;
      if (onChange && isValueChanged) {
        if (textContent === '' && isAllowedEmpty === false) {
          alert('Title cannot be empty.');
          onChange(value);
          node!.textContent = value;
        } else {
          onChange(textContent);
        }
      }
    }, [onChange, editableRef]);

    const cancel = useCallback((): void => {
      setEditing(false);
    }, [setEditing]);

    const isValueChanged = useMemo((): boolean => {
      return value !== editableRef.current?.textContent;
    }, [editableRef]);

    const onKeyDown = useCallback(
      (e: KeyboardEvent) => {
        switch (e.key) {
          case 'Enter':
          case 'Escape':
            save();
            break;
          default:
            break;
        }
      },
      [save],
    );

    return (
      <WrappedComponent
        className={editing ? 'editing' : ''}
        onClick={edit}
        onSelect={edit}
        contentEditable={editing}
        ref={editableRef}
        onBlur={save}
        onKeyDown={onKeyDown}
        {...rest}
      >
        {value || 'Title'}
      </WrappedComponent>
    );
  };
};

export default Editable;
