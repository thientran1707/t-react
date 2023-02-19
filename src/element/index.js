// Constants
import { REACT_TEXT_ELEMENT } from '../constants';

export function createTextElement(text) {
  return {
    type: REACT_TEXT_ELEMENT,
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

export function createElement(type, props, ...children) {
  return {
    type: type,
    props: {
      ...props,
      children: children
        .filter(child => !!child)
        .map(child =>
          typeof child === 'object' ? child : createTextElement(child)
        ),
    },
  };
}
