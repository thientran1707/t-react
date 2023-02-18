import React from 'react';

import Demo1 from './Demo1';
import Demo2 from './Demo2';

export default function SimpleDemo({ text }) {
  return (
    <div>
      <h2>Simple Demo</h2>
      <h2>{text}</h2>
      <Demo1 />
      <Demo2 />
    </div>
  );
}
