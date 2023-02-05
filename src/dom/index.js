// Constants
import { REACT_TEXT_ELEMENT } from '../constants';

export const isProperty = key => key !== 'children';

export function createDom(fiber) {
  const { type, props } = fiber;

  const dom =
    type === REACT_TEXT_ELEMENT
      ? document.createTextNode('')
      : document.createElement(type);

  Object.keys(props)
    .filter(isProperty)
    .forEach(key => (dom[key] = props[key]));

  return dom;
}

export function updateDom(dom, prevProps, nextProps) {
  // remove props that are removed
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(key => nextProps[key] == null)
    .forEach(key => (dom[key] = ''));

  // update or add new props
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(key => prevProps[key] !== nextProps[key])
    .forEach(key => (dom[key] = nextProps[key]));
}
