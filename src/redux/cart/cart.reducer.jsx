import cartTypes from "./cart.types";

const INITIAL_STATE = {
  name: null,
  email: null,
  phone: null,
  itemPrice: null,
  itemName: null,
  itemQuantity: null,
  shipStreet: null,
  shipCity: null,
  shipNumHome: null,
  cardNumber: null,
  cardCVC: null,
  cardEXPYear: null,
  cardEXPMount: null,
  type_send: null,
  shipPrice: null,
  total: null,
  sticker: "ריק",
  statusRes: null,
  startProcess: false,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.SET_CART_ITEMS:
      return {
        ...state,
        ...action.cart,
      };
    case cartTypes.SET_RES_FROM_CHECKOUT:
      return {
        ...state,
        statusRes: action.res,
      };
    case cartTypes.START_PROCESS_PAYMENT:
      return {
        ...state,
        startProcess: action.startProcess,
      };

    default:
      return state;
  }
};
export default cartReducer;
