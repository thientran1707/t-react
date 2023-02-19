import { reconcileChildren } from '../reconcile';

// For fiber
let wipFiber = null;
let hookIndex = null;

export function useState(initial) {
  return [initial, () => {}];
}

export function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];

  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}
