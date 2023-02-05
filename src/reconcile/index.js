import { EFFECT_TAG } from '../constants';
/**
 * Compare the diff between old fibers and the new fibers
 */
export function reconcileChildren(wipFiber, elements, deletions) {
  let index = 0;
  let oldFiber =
    wipFiber.alternate && wipFiber.alternate.child
      ? wipFiber.alternate.child
      : null;
  let previousSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;

    // TODO compare oldFiber and new
    // oldFiber: what we have render last time, element is new thing to render to the DOM
    const sameType = oldFiber && element && element.type === oldFiber.type;
    if (sameType) {
      // Update the DOM with new props
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effecTag: EFFECT_TAG.UPDATE,
      };
    } else if (element) {
      // Add the new DOM node
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effecTag: EFFECT_TAG.PLACEMENT,
      };
    } else if (oldFiber) {
      // delete oldFiber's DOM node
      // we do not have the new fiber so we have to add the effect tag to the old fiber
      // but when we commit the work, we do it from the wipRoot, which does not have the old fibers
      // so we need an array to keep track of nodes to remove
      oldFiber.effecTag = EFFECT_TAG.DELETION;
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else {
      previousSibling.sibling = newFiber;
    }

    previousSibling = newFiber;
    index++;
  }
}
