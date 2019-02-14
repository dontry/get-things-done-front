import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

export class FieldState {
  @observable
  value = "";

  @action
  onchange(value: string) {
    this.value = value;
  }
}

@observer
export class FieldInput extends Component<{ fieldState: FieldState }> {
  render() {
    const { fieldState } = this.props;
    return (
      <input
        type="text"
        value={fieldState.value}
        onChange={e => fieldState.onchange(e.target.value)}
      />
    );
  }
}
