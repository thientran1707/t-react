import { createDom } from '../dom';
import { reconcileChildren } from '../reconcile';

// Constants
import { REACT_TEXT_ELEMENT } from '../constants';

let nextUnitOfWork = null;
let currentRoot = null;
let wipRoot = null;
let deletions = [];

/**
 * Fiber is a structure for unit of work { type, dom, parent, child, sibling, alternate, effecTag, props }
 * 1) Create dom
 * 2) Reconcile
 * 3) Find next unit of work
 */
function performUnitOfWork(fiber) {
  // Step 1: Create dom
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  // Step 2: Create new fiber
  reconcileChildren(fiber, fiber.props.children);

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

function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber) {
  // base case
  if (!fiber) {
    return;
  }

  const parentDom = fiber.parent.dom;
  parentDom.appendChild(fiber.dom);

  // Recursively commit the child and sibling
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function workLoop(deadline) {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);

    shouldYield = deadline.timeRemaining() <= 0;
  }

  // we have completed the render phase, because there is no nextUnitOfWork
  // commit the work
  if (!nextUnitOfWork && wipRoot) {
    commitRoot(wipRoot);
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
  wipRoot = {
    dom: parentDom,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

// Start the work loop
requestIdleCallback(workLoop);
