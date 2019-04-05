import React, { Component, SyntheticEvent, createRef, ComponentClass } from "react";

interface IEditableProps {
  value: string;
  isAllowedEmpty?: boolean;
  editOnClick?: boolean;
  onChange?(value: string): void;
}

interface IEditableState {
  editing: boolean;
}

// https://stackoverflow.com/questions/31815633/what-does-the-error-jsx-element-type-does-not-have-any-construct-or-call
const Editable = (WrappedComponent: ComponentClass<any> | string) => {
  return class E extends Component<IEditableProps, IEditableState> {
    public state = {
      editing: false
    };
    // https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315
    private editableRef = createRef<HTMLElement>();

    public edit = (e: SyntheticEvent) => {
      e.stopPropagation();
      this.setState({ editing: true }, () => {
        const node = this.editableRef.current!;
        node.focus();
      });
    };

    public save = () => {
      this.setState({ editing: false }, () => {
        const { onChange, value, isAllowedEmpty } = this.props;
        const node = this.editableRef.current!;
        const textContent = node.textContent!;
        if (onChange && this.isValueChanged()) {
          if (textContent === "" && isAllowedEmpty === false) {
            alert("Title cannot be empty.");
            onChange(value);
            node.textContent = this.props.value;
          } else {
            onChange(textContent);
          }
        }
      });
    };

    public cancel = (): void => {
      this.setState({ editing: false });
    };

    public isValueChanged = (): boolean => {
      const node = this.editableRef.current!;
      return this.props.value !== node.textContent;
    };

    public handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
        case "Escape":
          this.save();
          break;
        default:
          break;
      }
    };

    public render() {
      let editOnClick = true;
      const { editing } = this.state;
      const { isAllowedEmpty, ...componentProps } = this.props;
      if (this.props.editOnClick !== undefined) {
        editOnClick = this.props.editOnClick;
      }
      return (
        <WrappedComponent
          className={editing ? "editing" : ""}
          onClick={editOnClick ? this.edit : undefined}
          onSelect={editOnClick ? this.edit : undefined}
          contentEditable={editing}
          ref={this.editableRef}
          onBlur={this.save}
          onKeyDown={this.handleKeyDown}
          {...componentProps}
        >
          {this.props.value || "Title"}
        </WrappedComponent>
      );
    }
  };
};

export default Editable;
