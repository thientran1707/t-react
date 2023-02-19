import { createDom, updateDom } from '../dom';
import { reconcileChildren } from '../reconcile';
import { commitWork, commitDeletion } from '../commit';
import { updateHostComponent } from './host-component';
import { updateFunctionComponent } from './function-component';

// Constants
import { REACT_TEXT_ELEMENT, EFFECT_TAG } from '../constants';

let nextUnitOfWork = null;
let currentRoot = null;
let wipRoot = null;
let deletions = [];

/**
 * Fiber is a structure for unit of work { type, dom, parent, child, sibling, alternate, effecTag, props }
 * 1) Update
 * 2) Reconcile
 * 3) Find next unit of work
 */
function performUnitOfWork(fiber) {
  // We only support Function Component
  // TODO Add the check for React.Component class if we would like so support Class Component
  const isFunctionComponent = typeof fiber.type === 'function';
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  // Find the next unit of work following the order:
  // 1) child -> 2) find the sibling -> 3) uncle (sibling of parent)
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

export function workLoop(deadline) {
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

export function render(root, parentDom) {
  // set nextUnitOfWork
  wipRoot = {
    dom: parentDom,
    props: {
      children: [root()],
    },
    alternate: currentRoot,
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}
