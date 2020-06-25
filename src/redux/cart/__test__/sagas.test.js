import * as sagas from "../cart.sagas";
import cartTypes from "../cart.types";
import { takeLatest } from "redux-saga/effects";

describe("test for sagas", () => {
  it("should test sendToAPIStartSaga", () => {
    const generator = sagas.sendToAPIStartSaga();
    expect(generator.next().value).toEqual(takeLatest(cartTypes.SEND_TO_API_START, sagas.sendToAPI));
  });
});
