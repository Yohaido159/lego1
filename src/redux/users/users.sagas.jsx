import usersTypes from "./users.types";
import { fetchData, fetchAllUser } from "./users.utils";
import { takeLatest, call, put, select } from "redux-saga/effects";
import axios from "axios";

function* fetchUsersFormApi() {
  yield fetchData();
}

function* fetchUsersFormApi2() {
  yield fetchAllUser();
}

export function* fetchUsersFormApiStart() {
  yield takeLatest(usersTypes.FETCH_USERS_FORM_API_START, fetchUsersFormApi);
}

export function* fetchUsersFormApiStart2() {
  yield takeLatest(usersTypes.FETCH_USERS_FORM_API_START, fetchUsersFormApi2);
}
