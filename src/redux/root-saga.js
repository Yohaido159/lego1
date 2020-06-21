import { all, call } from "redux-saga/effects";

import { sendToAPIStartSaga } from "./cart/cart.sagas";
import { fetchUsersFormApiStart, fetchUsersFormApiStart2, sendToAPISaga } from "./users/users.sagas";

export default function* rootSaga() {
  yield all([call(fetchUsersFormApiStart), call(fetchUsersFormApiStart2), call(sendToAPIStartSaga)]);
}
