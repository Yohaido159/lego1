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

// const INITIAL_STATE = {
//   name: "יוחאי34",
//   email: "yohaido159@gmail.com",
//   phone: "0549410031",
//   itemPrice: 60,
//   itemName: "לגו 30 חלקים",
//   cardNumber: 12312312,
//   cardCVC: 123,
//   cardEXPYear: 2020,
//   cardEXPMount: 12,
//   shipStreet: "סופה",
//   shipCity: "בית אל",
//   shipNumHome: "5",
//   shipPrice: "25 ש''ח",
//   ship: "משלוח עד הבית",
// };

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
