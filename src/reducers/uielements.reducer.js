import initialState from '../initialStates/uielements';

export function uielements(state=initialState, action) {
  switch (action.type) {
    case "getUsersSuccess":
      return {
        users: action.data,
      };
    default:
    return state;

  }
}
