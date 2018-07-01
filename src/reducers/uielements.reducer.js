import initialState from '../initialStates/uielements';

export function uielements(state=initialState, action) {
  switch (action.type) {
    case "getUsersSuccess":
      return {
        users: action.data,
      };
    case "getSelectedUsersSuccess":
      return {
        ...state,
        selectedUsers: action.selectedUsers,
        usersLength: action.usersLength,
      };
    case "getUsersLengthSuccess":
      return {
        usersLength: action.length
      };
    case "updateUserSuccess":
      return state;
    case "createUserSuccess":
      return state;
    default:
      return state;

  }
}
