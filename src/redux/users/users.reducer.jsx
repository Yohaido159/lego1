import usersTypes from "./users.types";

const INITIAL_STATE = {
  newUsers: [],
  oldUsers: [],
  userToApi: null,
  OpenSnack: false,
  errMsg: null,
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case usersTypes.SET_ALL_NEW_USER_DETAIL:
      return {
        ...state,
        newUsers: action.users,
      };
    case usersTypes.REMOVE_FROM_ALL_NEW_USER_DETAIL_BY_ID:
      return {
        ...state,
        newUsers: action.users,
      };
    case usersTypes.SET_BUY_USER_DETAIL:
      return {
        ...state,
        oldUsers: action.users,
      };
    case usersTypes.SEND_TO_API:
      return {
        ...state,
        userToApi: action.user,
      };
    case usersTypes.SET_OPEN_SNACK:
      return {
        ...state,
        OpenSnack: action.payload,
      };
    case usersTypes.ERR_MSG:
      return {
        ...state,
        errMsg: action.errMsg,
      };
    default:
      return state;
  }
};
export default usersReducer;
