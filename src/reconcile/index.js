/**
 * Compare the diff between old fibers and the new fibers
 */
export function reconcileChildren(wipFiber, elements) {
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
    const sameTime = oldFiber && element && element.type === oldFiber.type;
    if (sameType) {
      // TODO update the DOM node with new props
    } else if (element) {
      // TODO add the DOM node
    } else if (oldFiber) {
      // TODO delete oldFiber's node
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
