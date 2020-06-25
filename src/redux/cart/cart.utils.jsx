export const MakePhoneWithoutZero = (phone) => {
  console.log(phone);
  let newPhone = "";
  if (phone.toString()[0] === "0") {
    newPhone = parseInt(phone.toString().slice(1));
    console.log(newPhone);
  }
  return newPhone;
};

export const MakeMonthWithoutZero = (mounth) => {
  console.log(mounth);
  let newMounth = "";
  if (mounth.toString()[0] === "0") {
    newMounth = parseInt(mounth.toString().slice(1));
    console.log(newMounth);
    return newMounth;
  }
  return mounth;
};
