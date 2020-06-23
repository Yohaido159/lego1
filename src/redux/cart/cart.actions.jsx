import cartTypes from "./cart.types";

export const setCartItems = (cart) => ({
  type: cartTypes.SET_CART_ITEMS,
  cart: cart,
});

export const sendToBuySuccess = (message) => ({
  type: cartTypes.SEND_TO_API_SUCCESS,
  message: message,
});

export const sendToBuyFail = (message) => ({
  type: cartTypes.SEND_TO_API_FAIL,
  message: message,
});

export const sendToBuyStart = () => ({
  type: cartTypes.SEND_TO_API_START,
});

export const setResFromCheckout = (res) => ({
  type: cartTypes.SET_RES_FROM_CHECKOUT,
  res: res,
});

export const StartProcessPayment = (startProcess) => ({
  type: cartTypes.START_PROCESS_PAYMENT,
  startProcess: startProcess,
});
