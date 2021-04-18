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
  // 4. Update the state

  let state;
  let listeners = [];

  // 1. The State
  const getState = () => state;

  /**
   * 3. Listen to changes on the state
   * @param {function} listener
   * @returns function to unsubscribe
   */
  const subscribe = listener => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  // 4. Update the state
  // Responsible to update the sate inside of the actual Store - It needs to receive the Actiion to tell dispatch() the specific event that occurred inside of the applicaton
  const dispatch = action => {
    state = toDos(state, action);
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
