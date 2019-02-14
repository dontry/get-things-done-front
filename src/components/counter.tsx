import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  const increment = (count: number): void => {
    setCount(count + 1);
  };

  const decrement = (count: number): void => {
    setCount(count - 1);
  };

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => increment(count)}>+ 1</button>
      <button onClick={() => decrement(count)}>- 1</button>
    </div>
  );
}

export default Counter;
