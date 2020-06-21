import cartTypes from "./cart.types";

const INITIAL_STATE = {
  name: null,
  email: null,
  phone: null,
  itemPrice: null,
  itemName: null,
  shipStreet: null,
  shipCity: null,
  shipNumHome: null,
  shipPrice: "25 ש''ח",
  ship: "משלוח עד הבית",
  cardNumber: null,
  cardCVC: null,
  cardEXPYear: null,
  cardEXPMount: null,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.SET_CART_ITEMS:
      return {
        ...state,
        ...action.cart,
      };
    default:
      return state;
  }
};
export default cartReducer;
