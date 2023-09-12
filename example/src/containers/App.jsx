import React from 'react';

function Demo2() {
  return (
    <div>
      <span>I am demo 2. I am a child of demo 1</span>
    </div>
  )
}

function Demo1() {
  return (
    <div>
      <h2>Title </h2>
      <span>I am demo 1</span>
      <Demo2 />
    </div>
  )
}

export default function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <Demo1 />
    </div>
  );
}
