import { createDom } from '../dom';

// Constants
import { REACT_TEXT_ELEMENT } from '../constants';

let nextUnitOfWork = null;

/**
 * Fiber is a structure for unit of work { type, dom, parent, child, sibling, props }
 */
function performUnitOfWork(fiber) {
  // Step 1: Create dom and append to parent
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  // Step 2: Create new fiber
  let index = 0;
  let previousSibling = null;

  const elements = fiber.props.children;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    if (i === 0) {
      fiber.child = newFiber;
    } else {
      previousSibling.sibling = newFiber;
    }

    previousSibling = newFiber;
  }

  // Step 3: Return next unit of work

  // if there is a child, we return it
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    // otherwise, find the sibling or "uncle" (sibling of parent)
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }

    nextFiber = nextFiber.parent;
  }
}

function workLoop(deadline) {
  console.log('workLoop');
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);

    shouldYield = deadline.timeRemaining() <= 0;
    console.log('shouldYield = ', shouldYield);
  }

  // This will create the infinite loop
  requestIdleCallback(workLoop);
}

export function render(elementOrElementGenerator, parentDom) {
  const element =
    typeof elementOrElementGenerator === 'function'
      ? elementOrElementGenerator()
      : elementOrElementGenerator;

  // set nextUnitOfWork
  nextUnitOfWork = {
    dom: parentDom,
    props: {
      children: [element],
    },
  };
}

// Start the work loop
requestIdleCallback(workLoop);
