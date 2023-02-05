export function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let previousSibling = null;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: wipFiber,
      dom: null,
    };

    if (i === 0) {
      wipFiber.child = newFiber;
    } else {
      previousSibling.sibling = newFiber;
    }

    previousSibling = newFiber;
  }
}
