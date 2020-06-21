import usersTypes from "./users.types";

export const fetchUsersFormApiStart = () => ({
  type: usersTypes.FETCH_USERS_FORM_API_START,
});

export const setAllNewUserDetail = (users) => ({
  type: usersTypes.SET_ALL_NEW_USER_DETAIL,
  users: users,
});

export const setBuyUserDetail = (users) => ({
  type: usersTypes.SET_BUY_USER_DETAIL,
  users: users,
});

export const sendToAPI = (row) => ({
  type: usersTypes.SEND_TO_API,
  row: row,
});

export const setOpenSnack = (bool) => ({
  type: usersTypes.SET_OPEN_SNACK,
  payload: bool,
});

export const errMsg = (msg) => ({
  type: usersTypes.ERR_MSG,
  errMsg: msg,
});
