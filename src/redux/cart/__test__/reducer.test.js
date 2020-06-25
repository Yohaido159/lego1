import cartType from "../cart.types";
import * as cartAction from "../cart.actions";
import cartReducer from "../cart.reducer";

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

const MOCK_FULL_STATE = {
  name: "יוחאי",
  email: "yohaido159@gmail.com",
  phone: "0549410031",
  itemPrice: 72,
  itemName: "לגו",
  itemQuantity: "2",
  shipStreet: "סופה",
  shipCity: "בית אל",
  shipNumHome: "5",
  cardNumber: 12312312,
  cardCVC: 123,
  cardEXPYear: 2020,
  cardEXPMount: 12,
  type_send: "משלוח עד הבית",
  shipPrice: 45,
  total: 189,
  sticker: "ריק",
  statusRes: null,
  startProcess: false,
};

describe("test for reducer", () => {
  it("test for init state", () => {
    expect(cartReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("test cartTypes.SET_CART_ITEMS", () => {
    expect(cartReducer(undefined, cartAction.setCartItems(MOCK_FULL_STATE))).toEqual(MOCK_FULL_STATE);
  });

  it("test cartTypes.SET_RES_FROM_CHECKOUT", () => {
    expect(cartReducer(MOCK_FULL_STATE, cartAction.setResFromCheckout({ data: { Status: 0 } }))).toEqual({
      ...MOCK_FULL_STATE,
      statusRes: { data: { Status: 0 } },
    });
  });

  it("test cartTypes.START_PROCESS_PAYMENT", () => {
    expect(cartReducer(MOCK_FULL_STATE, cartAction.StartProcessPayment(true))).toEqual({
      ...MOCK_FULL_STATE,
      startProcess: true,
    });
  });
});
