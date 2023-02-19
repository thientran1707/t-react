import { reconcileChildren } from '../reconcile';

// For fiber
let wipFiber = null;
let hookIndex = null;

export function useState(initial) {
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternative.hooks[hookIndex];

  const hook = {
    // copy the state from previous hook
    // or use initial if this is the first time to run hook
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  const setState = action => {};

  return [hook.state, setState];
}

export function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];

  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}
