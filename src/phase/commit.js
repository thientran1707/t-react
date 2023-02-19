import { createDom, updateDom } from '../dom';

// Constants
import { REACT_TEXT_ELEMENT, EFFECT_TAG } from '../constants';

export function commitDeletion(fiber, parentDom) {
  if (fiber.dom) {
    parentDom.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, parentDom);
  }
}

export function commitWork(fiber) {
  // base case
  if (!fiber) {
    return;
  }

  // Some fibers does not have dom node
  // We travel up until find a dom
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const parentDom = domParentFiber.dom;
  if (fiber.effectTag === EFFECT_TAG.PLACEMENT && fiber.dom) {
    // Add new DOM node
    parentDom.appendChild(fiber.dom);
  } else if (fiber.effectTag === EFFECT_TAG.UPDATE && !fiber.dom) {
    // Update DOM node
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === EFFECT_TAG.DELETION) {
    // Delete DOM node
    commitDeletion(fiber, parentDom);
  }

  // Recursively commit the child and sibling
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
