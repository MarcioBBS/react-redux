function toDos(state = [], action) {
  if (action.type === "ADD_TODO") {
    return state.concat([action.todo]);
  }

  return state;
}

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
   * Listen for changes
   * @param {function} listener
   * @returns function to unsubscribe
   */
  const subscribe = listener => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  return {
    getState,
    subscribe,
  };
}

/*
const store = createStore();
const unsubscribe = store.subscribe(() => {
  console.log(`The store changed`);
});

// If we really want to unsubscribe then we invoke the unsubscribe() function
unsubscribe();
*/
