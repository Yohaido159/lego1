import cartTypes from "./cart.types";
import { takeLatest, call, put, select } from "redux-saga/effects";
import axios from "axios";

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
  }
  return newMounth;
};

export function* sendToAPI() {
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
        Quantity: 1,
        Description: cart.itemName,
      },
    ],
    UpdateCustomerByEmail: true,
    UpdateCustomerByEmail_AttachDocument: true,
    SendDocumentByEmail: true,
    DocumentLanguage: true,
    AuthoriseOnly: true,
    DraftDocument: null,
    Credentials: {
      CompanyID: 67576974,
      APIKey: "ZaXmdTsr597vKd2mmY8rN0W9qWPhFrpsfGubh8gKMDqFBL9YLt",
    },
  };

  const res = yield axios.post(url, data);
  console.log(res);
}

export function* sendToAPIStartSaga() {
  yield takeLatest(cartTypes.SEND_TO_API_START, sendToAPI);
}
