import initialState from '../initialStates/login.js';

export function login(state = initialState, action) {
  switch (action.type) {
    case "Login_Request":
      return {};
    case "Login_Failure":
      return {};
    case "Get_Details_Success":
      return {
        ...state,
        persons: action.persons
      };
    case "Get_Details_Failure":
      return {};
    default:
      return state
  }
}
