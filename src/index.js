function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  };
}

export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === 'object' ? child : createTextElement(child)
      )
    }
  };
}

export function render(elementOrElementGenerator, parentDom) {
  const element = typeof elementOrElementGenerator === 'function' ? elementOrElementGenerator() : elementOrElementGenerator;

  const { type, props } = element;
  // create the dom for current element
  const dom = type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(type);

  const isProperty = key => key !== 'children';
  Object.keys(props).filter(isProperty).forEach(key => dom[key] = props[key])

  // recursively call render to children
  element.props.children.forEach(child => {
    render(child, dom);
  });

  parentDom.appendChild(dom);
}

const React = {
  createElement,
  render,
};

export default React;
