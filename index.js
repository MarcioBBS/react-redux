function createStore() {
  // The Store should have four paths
  // 1. The State
  // 2. Get the state
  // 3. Listen to changes on the state
  // $. Update the state

  let state;

  const getState = () => state;

  return getState;
}
