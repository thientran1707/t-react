import { createElement } from './element';
import { createRoot, workLoop } from './render';
import { useState } from './render/function-component';

// Start the work loop
requestIdleCallback(workLoop);

const React = {
  createElement,
  useState,
  createRoot,
};

export default React;
