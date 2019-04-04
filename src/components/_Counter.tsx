import React from "react";
import { observable, action, configure } from "mobx";
import { observer } from "mobx-react";

configure({
  enforceActions: "always"
});

class CounterData {
  @observable public clickedCount: number = 0;

  @action
  public increment(): void {
    this.clickedCount++;
  }

  @action
  public decrement(): void {
    this.clickedCount--;
  }
}

const data = new CounterData();
const Counter = observer(({}) => {
  return (
    <>
      <p>You clicked {data.clickedCount} times</p>
      <button onClick={() => data.increment()}>+ 1</button>
      <button onClick={() => data.decrement()}>- 1</button>
    </>
  );
});

export default Counter;
