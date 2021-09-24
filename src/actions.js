export function updateAction(state, payload) {
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

//const initialState = {};

export function resetState(state, payload) {
  return {};
}
