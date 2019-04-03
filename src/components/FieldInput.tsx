import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

export class FieldState {
  @observable
  public value = "";

  @action
  public onChange(value: string): void {
    this.value = value;
  }
}

@observer
export class FieldInput extends Component<{ fieldState: FieldState }> {
  public render() {
    const { fieldState } = this.props;
    return (
      <input
        type="text"
        value={fieldState.value}
        onChange={e => fieldState.onChange(e.target.value)}
      />
    );
  }
}

export default FieldInput;
