import * as usersUtils from "../users.utils";

const MockUsersBillOfiiceGuy = [
  {
    Billing_Customer: [
      {
        ColumnKeys: null,
        Fields: null,
        ID: 68627901,
        Name: "הי_שולם",
        RowKeys: null,
        SchemaID: 68314627,
        Status: 0,
        Version: 6,
      },
    ],
  },
  {
    Billing_Customer: [
      {
        ColumnKeys: null,
        Fields: null,
        ID: 68627901,
        Name: "הי",
        RowKeys: null,
        SchemaID: 68314627,
        Status: 0,
        Version: 6,
      },
    ],
  },
];

const MockUsersFullOfiiceGuy = {
  data: {
    Data: {
      Entity: {
        Accounting_DocumentsStatusEnum: [1],
        Accounting_DocumentsStatusDate: ["2020-06-23T00:00:00+03:00"],
        Customers_EmailAddress: ["yohaido159@gmail.com"],
        Customers_FullName: ["אליצור עימנואל_שולם"],
        Customers_Phone: ["549410031"],
        Folder: "68314627",
        ID: 69242397,
        Property_68515460: ["אחד העם"],
        Property_68515470: ["6"],
        Property_68516405: ["רמת גן"],
        Property_69190176: ["2"],
        Property_69190511: ["לגו 30 חלקים"],
        Property_69190538: ["משלוח עד הבית"],
        Property_69241918: ["22134038"],
      },
    },
  },
};

const MockUsersEdited = [
  {
    email: "yohaido159@gmail.com",
    name: "אליצור עימנואל_שולם",
    phone: "549410031",
    id: 69242397,
    street: "אחד העם",
    num_home: "6",
    city: "רמת גן",
    itemQuantity: "2",
    item: "לגו 30 חלקים",
    type_send: "משלוח עד הבית",
    sticker: "22134038",
  },
];

describe("test for utils users utils when started - 1", () => {
  it("should test fetchData", () => {
    // צריך לכתוב טסט לזה זה אקסיוס
  });

  it("should test filterData", () => {
    // "לא צריכה להיבדק כי היא אינה עושה מאומה אלא רק מארגנן"
  });

  it("should test checkUserReturnEmpty return only not SHOLAM", () => {
    expect(usersUtils.checkUserReturnEmpty(MockUsersBillOfiiceGuy)).toEqual(MockUsersBillOfiiceGuy.slice(1));
  });

  it("should test checkUserBuy return only SHOLAM", () => {
    expect(usersUtils.checkUserBuy(MockUsersBillOfiiceGuy)).toEqual(MockUsersBillOfiiceGuy.slice(0, 1));
  });

  it("should test makeUserArrSimple ", () => {
    expect(usersUtils.makeUserArrSimple(MockUsersFullOfiiceGuy, [])).toEqual(MockUsersEdited);
  });
});
