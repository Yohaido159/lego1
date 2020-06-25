import * as cartAction from "../cart.actions";
import cartActionTypes from "../cart.types";

describe("test for actions ", () => {
  it("should test action StartProcessPayment", () => {
    const mockPayload = true;
    const action = cartAction.StartProcessPayment(mockPayload);
    expect(action.type).toEqual(cartActionTypes.START_PROCESS_PAYMENT);
    expect(action.startProcess).toEqual(mockPayload);
  });

  it("should test action setResFromCheckout", () => {
    const mockPayload = { data: 10 };
    const action = cartAction.setResFromCheckout(mockPayload);
    expect(action.type).toEqual(cartActionTypes.SET_RES_FROM_CHECKOUT);
    expect(action.res).toEqual(mockPayload);
  });

  it("should test action sendToBuyStart", () => {
    const action = cartAction.sendToBuyStart();
    expect(action.type).toEqual(cartActionTypes.SEND_TO_API_START);
  });

  it("should test action sendToBuyFail ", () => {
    const mockPayload = "massge error";
    const action = cartAction.sendToBuyFail(mockPayload);
    expect(action.type).toEqual(cartActionTypes.SEND_TO_API_FAIL);
    expect(action.message).toEqual(mockPayload);
  });

  it("should test action sendToBuySuccess", () => {
    const mockPayload = "massge success";
    const action = cartAction.sendToBuySuccess(mockPayload);
    expect(action.type).toEqual(cartActionTypes.SEND_TO_API_SUCCESS);
    expect(action.message).toEqual(mockPayload);
  });

  it("should test action setCartItems", () => {
    const mockPayload = [{ id: 1 }, { id: 2 }];
    const action = cartAction.setCartItems(mockPayload);
    expect(action.type).toEqual(cartActionTypes.SET_CART_ITEMS);
    expect(action.cart).toEqual(mockPayload);
  });
});
