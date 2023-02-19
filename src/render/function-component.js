import { reconcileChildren } from '../reconcile';
import { ReactGlobal } from '../global';

// For fiber
let wipFiber = null;
let hookIndex = null;

export function useState(initial) {
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];

  const hook = {
    // copy the state from previous hook
    // or use initial if this is the first time to run hook
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  // Run the actions
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach(action => {
    hook.state = action(hook.state);
  });

  const setState = actionOrValue => {
    hook.queue.push(
      typeof actionOrValue === 'function' ? actionOrValue : () => actionOrValue
    );

    // trigger the new render phase, similar to the React.render function
    ReactGlobal.wipRoot = {
      dom: ReactGlobal.currentRoot.dom,
      props: ReactGlobal.currentRoot.props,
      alternate: ReactGlobal.currentRoot,
    };
    ReactGlobal.deletions = [];
    ReactGlobal.nextUnitOfWork = ReactGlobal.wipRoot;
  };

  wipFiber.hooks.push(hook);
  hookIndex++;

  return [hook.state, setState];
}

export function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];

  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}
