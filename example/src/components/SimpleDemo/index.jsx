import React from 'react';

import Demo1 from './Demo1';
import Demo2 from './Demo2';

export default function SimpleDemo({ text }) {
  const [count, setCount] = React.useState(0);

  const onCounterClick = () => {
    console.log('onCounterClick');
    setCount(count => count + 1);
  };

  return (
    <div>
      <h2>Simple Demo</h2>
      <h2>{text}</h2>
      <h2>Count: {count}</h2>
      <button onClick={onCounterClick}>Click to increase count</button>
      <Demo1 />
      <Demo2 />
    </div>
  );
}
