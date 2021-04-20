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

// Action Creators
const addTodoAction = todo => ({ type: ADD_TODO, todo });

const removeTodoAction = id => ({ type: REMOVE_TODO, id });

const toggleTodoAction = id => ({ type: TOGGLE_TODO, id });

const addGoalAction = goal => ({ type: ADD_GOAL, goal });

const removeGoalAction = id => ({ type: REMOVE_GOAL, id });
// End - Action Creators

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

// Create the STORE
const store = createStore(app);

// Lsiten for changes
store.subscribe(() => {
  console.log("The new state is: ", store.getState());
});

/***  TEST ***/
store.dispatch(
  addTodoAction({
    id: 0,
    name: "Walk the dog",
    complete: false,
  })
);

store.dispatch(
  addTodoAction({
    id: 1,
    name: "Wash the car",
    complete: false,
  })
);

store.dispatch(
  addTodoAction({
    id: 2,
    name: "Go to the gym",
    complete: true,
  })
);

store.dispatch(removeTodoAction(1));

store.dispatch(toggleTodoAction(0));

store.dispatch(
  addGoalAction({
    id: 0,
    name: "Learn Redux",
  })
);

store.dispatch(
  addGoalAction({
    id: 1,
    name: "Lose 20 pounds",
  })
);

store.dispatch(removeGoalAction(0));
