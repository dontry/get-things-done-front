import { action,observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';

export class FieldState {
  @observable
  public value = '';

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
        type='text'
        aria-label='field-input'
        value={fieldState.value}
        onChange={e => fieldState.onChange(e.target.value)}
      />
    );
  }
}

export default FieldInput;
