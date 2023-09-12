export function createElement() {
  console.log('createElement');
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
