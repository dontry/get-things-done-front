import React, { useState, useEffect } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

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
    <div>
      <p>You clicked {data.clickedCount} times</p>
      <button onClick={() => data.increment()}>+ 1</button>
      <button onClick={() => data.decrement()}>- 1</button>
    </div>
  );
});

export default Counter;
