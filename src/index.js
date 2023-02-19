import { createElement } from './element';
import { render, workLoop } from './render';
import { useState } from './render/function-component';

// Start the work loop
requestIdleCallback(workLoop);

const React = {
  createElement,
  useState,
  render,
};

export default React;
