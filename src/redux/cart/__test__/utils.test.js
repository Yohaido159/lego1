import * as cartUtils from "../cart.utils";

describe("test for utils cart utils", () => {
  it("should MakePhoneWithoutZero", () => {
    expect(cartUtils.MakePhoneWithoutZero("0549410031")).toEqual(549410031);
  });

  it("should MakeMonthWithoutZero", () => {
    expect(cartUtils.MakeMonthWithoutZero("06")).toEqual(6);
  });
});
