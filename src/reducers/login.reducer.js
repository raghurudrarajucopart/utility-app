import initialState from '../initialStates/login.js';

// let user = JSON.parse(localStorage.getItem('user'));
// const initialState = user ? { loggedIn: true, user } : {};

export function login(state = initialState, action) {
  switch (action.type) {
    case "Login_Request": // Get_Details_Success
      return {};
    // case "Login_Success":
    //   return {
    //     loggedIn: true,
    //     userDetails: action.userDetails
    //   };
    case "Login_Failure":
      return {};
    case "Get_Details_Success":
      return {
        persons: action.persons
      };
    case "Get_Details_Failure":
      return {};
    default:
      return state

  }
}
