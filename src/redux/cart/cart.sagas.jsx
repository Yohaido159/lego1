import cartTypes from "./cart.types";
import { takeLatest, call, put, select } from "redux-saga/effects";
import axios from "axios";
import store from "../../redux/store";
import { setResFromCheckout, StartProcessPayment } from "../../redux/cart/cart.actions";

const MakePhoneWithoutZero = (phone) => {
  console.log(phone);
  let newPhone = "";
  if (phone.toString()[0] === "0") {
    newPhone = parseInt(phone.toString().slice(1));
    console.log(newPhone);
  }
  return newPhone;
};

const MakeMonthWithoutZero = (mounth) => {
  console.log(mounth);
  let newMounth = "";
  if (mounth.toString()[0] === "0") {
    newMounth = parseInt(mounth.toString().slice(1));
    console.log(newMounth);
    return newMounth;
  }
  return mounth;
};

export function* sendToAPI() {
  store.dispatch(StartProcessPayment(true));
  const cart = yield select((state) => state.cart_main);
  console.log(cart);
  const url = "https://www.myofficeguy.com/api/billing/payments/charge/";
  const data = {
    Customer: {
      Name: cart.name,
      Phone: MakePhoneWithoutZero(cart.phone),
      EmailAddress: cart.email,
      Property_68516405: cart.shipCity,
      Property_68515460: cart.shipStreet,
      Property_68515470: cart.shipNumHome,
      Property_69190176: cart.itemQuantity,
      Property_69190511: cart.itemName,
      Property_69190538: cart.type_send,
      Property_69241918: cart.sticker,
    },
    PaymentMethod: {
      CreditCard_Number: cart.cardNumber,
      CreditCard_ExpirationMonth: MakeMonthWithoutZero(cart.cardEXPMount),
      CreditCard_ExpirationYear: cart.cardEXPYear,
      CreditCard_CVV: cart.cardCVC,
      Type: 1,
    },
    Items: [
      {
        Item: {
          Name: cart.itemName,
          Price: cart.itemPrice,
          Currency: null,
          Cost: cart.itemPrice,
          ExternalIdentifier: null,
          SearchMode: null,
        },
        Quantity: parseInt(cart.itemQuantity),
        Description: cart.itemName,
      },
      {
        Item: {
          Name: cart.type_send,
          Price: cart.shipPrice,
          Currency: null,
          Cost: cart.shipPrice,
          ExternalIdentifier: null,
          SearchMode: null,
        },
        Quantity: 1,
        Description: cart.type_send,
      },
    ],
    UpdateCustomerByEmail: true,
    UpdateCustomerByEmail_AttachDocument: true,
    SendDocumentByEmail: true,
    SendDocumentByEmail_Language: "0",
    DocumentLanguage: "0",
    VATIncluded: true,
    AuthoriseOnly: false,
    DraftDocument: null,
    Credentials: {
      CompanyID: 67576974,
      APIKey: "ZaXmdTsr597vKd2mmY8rN0W9qWPhFrpsfGubh8gKMDqFBL9YLt",
    },
  };

  const res = yield axios.post(url, data);
  console.log(res);
  store.dispatch(setResFromCheckout(res));
  store.dispatch(StartProcessPayment(false));
}

export function* sendToAPIStartSaga() {
  yield takeLatest(cartTypes.SEND_TO_API_START, sendToAPI);
}
