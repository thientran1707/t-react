import { createDom } from '../dom';
import { reconcileChildren } from '../reconcile';

export function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  reconcileChildren(fiber, fiber.props.children);
}
