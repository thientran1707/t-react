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

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: wipFiber,
      dom: null,
    };

    // TODO compare oldFiber and new

    if (index === 0) {
      wipFiber.child = newFiber;
    } else {
      previousSibling.sibling = newFiber;
    }

    previousSibling = newFiber;
    index++;
  }
}
