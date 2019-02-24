import React, { useState, useEffect } from "react";
import { observable, action, configure } from "mobx";
import { observer } from "mobx-react";

configure({
  enforceActions: "always"
});

class CounterData {
  @observable clickedCount: number = 0;

  @action
  increment(): void {
    this.clickedCount++;
  }

  @action
  decrement(): void {
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
