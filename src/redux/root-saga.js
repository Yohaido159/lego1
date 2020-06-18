import { all, call } from "redux-saga/effects";

import { sendToAPIStartSaga } from "./cart/cart.sagas";

export default function* rootSaga() {
  yield all([call(sendToAPIStartSaga)]);
}
