export function updateAction(state, payload) {
  return {
    ...state,
    ...payload,
  };
}

//const initialState = {};

export function resetState(state, payload) {
  return {};
}
