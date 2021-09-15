export function updateAction(state, payload) {
  console.log("state:", state);
  console.log("payload:", payload);
  return {
    ...state,
    ...payload,
  };
}

export function updateFN011(state, payload) {
  return {
    ...state,
    fn011: { ...payload },
  };
}

export function updateFN022(state, payload) {
  return {
    ...state,
    fn022: { ...payload },
  };
}

//const initialState = {};

export function resetState(state, payload) {
  return {};
}
