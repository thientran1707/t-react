// Special case to handle text node
function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(
        child => typeof child === 'object' ? child : createTextElement(child)
      ),
    }
  }
}

export function createRoot(parentDom) {
  return {
    render: root => {
      console.log('render');
    }
  }
}

const React = {
  createElement,
  createRoot,
};

export default React;
