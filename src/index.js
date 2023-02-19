import { createElement } from './element';
import { render, workLoop } from './render';

// Start the work loop
requestIdleCallback(workLoop);

const React = {
  createElement,
  render,
};

export default React;
