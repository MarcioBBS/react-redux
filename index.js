// LIBRARY CODE - The Store!
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

/***  Begin - Reducer functions  ***/

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";
// Root reducer
// Whenever [dispatch] is called, we invoke our [app] function. The [app] function will then invoke the [todos] reducer as well as the [goals] reducer. Those will return their specific portions of the state. And then, the [app] function will return a state object with a [todos] property (the value of which is what the [todos] reducer returned) and a [goals] property (the value of which is what the [goals] reducer returned).
function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

// APP Todos - Reducer
//Passing the root reducer to our store since our createStore function can only take one reducer.
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(todo => (todo.id !== action.id ? todo : Object.assign({}, todo, { complete: !todo.complete })));
    default:
      return state;
  }
}

// App Goals - Reducer
function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
}

/***  End - Reducer functions  ***/

const store = createStore(app);

store.subscribe(() => {
  console.log("The new state is: ", store.getState());
});

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: "Learn React",
    complete: false,
  },
});

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 1,
    name: "Study more",
    complete: false,
  },
});
