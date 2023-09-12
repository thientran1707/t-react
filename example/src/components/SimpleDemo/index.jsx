import React from 'react';

import Demo1 from './Demo1';
import Demo2 from './Demo2';

export default function SimpleDemo({ text }) {
  const [count, setCount] = React.useState(0);
  const [show, setShow] = React.useState(false);

  const onCounterIncreaseClick = () => {
    setCount(count => count + 1);
  };

  const onCounterDecreaseClick = () => {
    setCount(count => count - 1);
  };

  const onToggleChange = () => {
    setShow(show => !show);
  };

  return (
    <div>
      <h1>Demo Simple Component</h1>
      <Demo1 />
      <Demo2 />
      <h1>Demo props</h1>
      <h2>{text}</h2>
      <h1>Demo For Update</h1>
      <h2>Count: {count}</h2>
      <button onClick={onCounterIncreaseClick}>Click to increase count</button>
      <button onClick={onCounterDecreaseClick}>Click to decrease count</button>
      <h1>Demo For Deletion</h1>
      <button onClick={onToggleChange}>Click to toggle hiden message</button>
      {show && <div>Surpise</div>}
    </div>
  );
}
