// LIBRARY CODE
/**
 *
 * @param {Pure Function} reducer
 * @returns
 */
function createStore(reducer) {
  // The Store should have four paths
  // 1. The State
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. Update the state

  let state;
  let listeners = []; // Array of functions

  // 1. The State
  const getState = () => state;

  /**
   * 3. Listen to changes on the state
   * Takes in functions that will be called when the state changes
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
    state = reducer(state, action);
    listeners.forEach(listener => listener()); // Invoke all Listener(function) inside of the array because the state has (potentially) changed.
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

// APP CODE
function toDos(state = [], action) {
  if (action.type === "ADD_TODO") {
    return state.concat([action.todo]);
  }

  return state;
}
