import initialState from '../initialStates/dashboard';

export function dashboard(state=initialState, action){

  switch (action.type) {
    case "Dashboard_Page":
      return {
        ...state,
        userDetails: action.userDetails
      }
    default:
      return state;
  }

}
