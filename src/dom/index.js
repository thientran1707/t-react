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
