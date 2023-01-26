// Constants
import { REACT_TEXT_ELEMENT } from '../constants';

let nextUnitOfWork = null;

function performUnitOfWork(nextUnitOfWork) {
  // TODO
}

function workLoop(deadline) {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);

    shouldYield = deadline.timeRemaining() <= 0;
  }

  requestIdleCallback(workLoop);
}

export function render(elementOrElementGenerator, parentDom) {
  const element =
    typeof elementOrElementGenerator === 'function'
      ? elementOrElementGenerator()
      : elementOrElementGenerator;

  const { type, props } = element;
  // create the dom for current element
  const dom =
    type === REACT_TEXT_ELEMENT
      ? document.createTextNode('')
      : document.createElement(type);

  const isProperty = key => key !== 'children';
  Object.keys(props)
    .filter(isProperty)
    .forEach(key => (dom[key] = props[key]));

  // recursively call render to children
  element.props.children.forEach(child => {
    render(child, dom);
  });

  parentDom.appendChild(dom);
}
