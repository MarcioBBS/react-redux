function createStore() {
  // The Store should have four paths
  // 1. The State
  // 2. Get the state
  // 3. Listen to changes on the state
  // $. Update the state

  let state;
  let listeners = [];

  const getState = () => state;

  /**
   *
   * @param {function} listener
   * @returns
   */
  const subscribe = listener => listeners.push(listener);

  return {
    getState,
    subscribe,
  };
}

const store = createStore();

//Invoke the subscribe method
store.subscribe(() => {
  console.log(`The new state is: ${store.getState()}`);
});

// New subscription
store.subscribe(() => {
  console.log(`The store changed`);
});
