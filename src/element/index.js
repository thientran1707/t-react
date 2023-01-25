// Constants
import { REACT_TEXT_ELEMENT } from '../constants';

export function createTextElement(text) {
  return {
    type: REACT_TEXT_ELEMENT,
    props: {
      nodeValue: text,
      children: []
    }
  };
}

export function createElement(typeOrGenerator, props, ...children) {
  if (typeof typeOrGenerator === 'function') {
    return typeOrGenerator();
  }

  return {
    type: typeOrGenerator,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === 'object' ? child : createTextElement(child)
      )
    }
  }
}
