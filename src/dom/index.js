// Constants
import { REACT_TEXT_ELEMENT } from '../constants';

const getNativeEventType = key => key.toLowerCase().substring(2);

export const isEvent = key => key.startsWith('on');

export const isProperty = key => key !== 'children' && !isEvent(key);

export function createDom(fiber) {
  const { type, props } = fiber;

  const dom =
    type === REACT_TEXT_ELEMENT
      ? document.createTextNode('')
      : document.createElement(type);

  // Add event listener
  Object.keys(props)
    .filter(isEvent)
    .forEach(key => {
      dom.addEventListener(getNativeEventType(key), props[key]);
    });

  // Add new props
  Object.keys(props)
    .filter(isProperty)
    .forEach(key => (dom[key] = props[key]));

  return dom;
}

export function updateDom(dom, prevProps, nextProps) {
  // remove old or changed events listener
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => nextProps[key] == null || prevProps[key] !== nextProps)
    .forEach(key => {
      dom.removeEventListener(getNativeEventType(key), prevProps[key]);
    });
  // remove props that are removed
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(key => nextProps[key] == null)
    .forEach(key => (dom[key] = ''));

  // add event listener
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(key => prevProps[key] !== nextProps[key])
    .forEach(key => {
      dom.addEventListener(getNativeEventType(key), nextProps[key]);
    });

  // update or add new props
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(key => prevProps[key] !== nextProps[key])
    .forEach(key => (dom[key] = nextProps[key]));
}
