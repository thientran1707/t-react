const TEXT_ELEMENT_TYPE = 'TEXT_ELEMENT';
const isProperty = key => key !== 'children';

// Special case to handle text node
function createTextElement(text) {
  return {
    type: TEXT_ELEMENT_TYPE,
    props: {
      nodeValue: text,
      children: []
    }
  }
}

export function createElement(typeOrGenerator, props, ...children) {
  if (typeof typeOrGenerator === 'function') {
    return typeOrGenerator();
  }

  return {
    type: typeOrGenerator,
    props: {
      ...props,
      children: children.map(
        child => typeof child === 'object' ? child : createTextElement(child)
      ),
    }
  }
}

function renderHelper(element, container) {
  // Create Dom node
  const dom = element.type === TEXT_ELEMENT_TYPE ? 
    document.createTextNode('') : 
    document.createElement(element.type);

  // Append props to node
  Object
    .keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    });

  // Call render recursively in children
  element.props.children.forEach(child => {
    renderHelper(child, dom);
  });

  // Add to container
  container.appendChild(dom);
}

export function createRoot(parentDom) {
  return {
    render: root => {
      renderHelper(root(), parentDom);
    },
  };
}

const React = {
  createElement,
  createRoot,
};

export default React;
