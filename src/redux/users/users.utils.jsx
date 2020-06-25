import React from "react";
import axios from "axios";
import {
  setAllNewUserDetail,
  setBuyUserDetail,
  setOpenSnack,
  errMsg,
  removeFromAllNewUserDetailById,
} from "./users.actions";

import store from "../../redux/store";

const key = "ZaXmdTsr597vKd2mmY8rN0W9qWPhFrpsfGubh8gKMDqFBL9YLt";
const num_shop = 67576974;

/***************************/
// when started - 1
/***************************/

export const fetchData = async () => {
  const url = "https://cors-anywhere.herokuapp.com/https://www.myofficeguy.com/api/crm/data/listentities/";
  const data = {
    Folder: 67380502,
    IncludeInheritedFolders: true,
    LoadProperties: true,
    Paging: {
      PageSize: 1000,
    },
    Credentials: {
      CompanyID: num_shop,
      APIKey: key,
    },
  };
  const { data: resData } = await axios.post(url, data);
  filterData(resData);
};

export const filterData = (data) => {
  console.log(data);
  const arr = data?.Data?.Entities;
  console.log(arr);
  if (arr !== undefined) {
    // לוקח את כל המשתמשים
    let newUserBuyArr = arr.filter((entity) => entity.Billing_Valid !== undefined);
    console.log(newUserBuyArr);

    // TEST ONLY
    // let newUserBuyArrForTest = arr;
    // console.log(newUserBuyArrForTest);

    // מכניס רק את מי שיש לו שם
    let newUserWithName = newUserBuyArr.filter((entity) => entity.Billing_Customer !== undefined);
    // let newUserWithName = newUserBuyArrForTest.filter((entity) => entity.Billing_Customer !== undefined);
    console.log(newUserWithName);

    // מחזיר רק את מי שאין לו בשם שולם או הועבר למשלוח
    let newUser = checkUserReturnEmpty(newUserWithName);
    let userBuy = checkUserBuy(newUserWithName);

    // setBuyUserDetail(userBuy);
    console.log(newUser);
    console.log(userBuy);

    // מושך מכל לקוח חדש שהזמין את שם העיר רחוב מס' בית וטלפון
    let allNewUserDetail = getAllNewUserDetail(newUser);

    console.log(allNewUserDetail);

    // מעביר את הפרטים לתצוגה
    // setAllNewUserDetail(allNewUserDetail);
    store.dispatch(setAllNewUserDetail(allNewUserDetail));
  }
};

export const checkUserReturnEmpty = (arr) => {
  const newUser = arr.filter((user) => {
    return !user?.Billing_Customer[0].Name.includes("שולם") && !user?.Billing_Customer[0].Name.includes("הועבר_למשלוח");
  });
  return newUser;
};

export const checkUserBuy = (arr) => {
  const userBuy = arr.filter((user) => {
    if (user.Billing_Customer) {
      return user?.Billing_Customer[0].Name.includes("שולם");
    }
  });
  return userBuy;
};

export const getAllNewUserDetail = (arr) => {
  let mainDetailUser = [];

  let url = "https://cors-anywhere.herokuapp.com/https://www.myofficeguy.com/api/crm/data/getentity/";

  arr.forEach(async (user) => {
    if (user.Billing_Customer[0] !== undefined) {
      let id = user.Billing_Customer[0].ID;
      let data = {
        EntityID: `${id}`,
        IncludeIncomingProperties: true,
        IncludeFields: true,
        Credentials: {
          CompanyID: num_shop,
          APIKey: key,
        },
      };
      let res = await axios.post(url, data);
      mainDetailUser = makeUserArrSimple(res, mainDetailUser);
    }
  });
  console.log(mainDetailUser);
  return mainDetailUser;
};

export const makeUserArrSimple = (res, arr) => {
  console.log(res);
  if (
    res.data.Data?.Entity?.Customers_FullName &&
    res.data.Data?.Entity?.Customers_EmailAddress &&
    res.data.Data?.Entity?.Customers_Phone &&
    res.data.Data?.Entity?.Property_68516405 &&
    res.data.Data?.Entity?.Property_68515460 &&
    res.data.Data?.Entity?.Property_68515470 &&
    res.data.Data?.Entity?.Property_69190176 &&
    res.data.Data?.Entity?.Property_69190511 &&
    res.data.Data?.Entity?.Property_69190538 &&
    res.data.Data?.Entity?.Property_69241918
  ) {
    arr.push({
      id: res.data.Data?.Entity?.ID,
      name: res.data.Data?.Entity?.Customers_FullName[0],
      email: res.data.Data?.Entity?.Customers_EmailAddress[0],
      phone: res.data.Data?.Entity?.Customers_Phone[0],
      city: res.data.Data?.Entity?.Property_68516405[0],
      street: res.data.Data?.Entity?.Property_68515460[0],
      num_home: res.data.Data?.Entity?.Property_68515470[0],
      itemQuantity: res.data.Data?.Entity?.Property_69190176[0],
      item: res.data.Data?.Entity?.Property_69190511[0],
      type_send: res.data.Data?.Entity?.Property_69190538[0],
      sticker: res.data.Data?.Entity?.Property_69241918[0],
    });
    return arr;
  }
};

/***************************/
// when started - 2
/***************************/
export const fetchAllUser = async () => {
  const url = "https://cors-anywhere.herokuapp.com/https://www.myofficeguy.com/api/crm/data/listentities/";
  const data = {
    Folder: 67379936,
    IncludeInheritedFolders: true,
    LoadProperties: true,
    Paging: {
      PageSize: 1000,
    },
    Credentials: {
      CompanyID: num_shop,
      APIKey: key,
    },
  };
  const { data: resData } = await axios.post(url, data);
  filterUser(resData);
};

export const filterUser = (data) => {
  // מקבל את רשימת האנשים שנרשמו
  const arr = data?.Data?.Entities;
  let users;
  if (arr !== undefined) {
    // מחזיר רשימה רק של מי שיש לו בשם "שולם"
    users = makeArrSimpleToGive(arr);
    console.log(users);
    store.dispatch(setBuyUserDetail(users));
  }
  return users;
};

export const makeArrSimpleToGive = (arr) => {
  let newArr = [];
  let newArrFinly = [];
  console.log(arr);
  newArr = filterUserByBuy(arr);
  console.log(newArr);

  newArr.forEach((entity) => {
    if (
      entity.ID &&
      entity.Customers_FullName &&
      entity.Customers_EmailAddress &&
      entity.Customers_Phone &&
      entity.Property_68516405 &&
      entity.Property_68515460 &&
      entity.Property_68515470 &&
      entity.Property_69190176 &&
      entity.Property_69190511 &&
      entity.Property_69190538 &&
      entity.Property_69241918
    ) {
      newArrFinly.push({
        id: entity.ID,
        name: entity.Customers_FullName[0],
        email: entity.Customers_EmailAddress[0],
        phone: entity.Customers_Phone[0],
        city: entity.Property_68516405[0],
        street: entity.Property_68515460[0],
        num_home: entity.Property_68515470[0],
        itemQuantity: entity.Property_69190176[0],
        item: entity.Property_69190511[0],
        type_send: entity.Property_69190538[0],
        sticker: entity.Property_69241918[0],
      });
    }
  });
  console.log(newArrFinly);
  return newArrFinly;
};

export const filterUserByBuy = (arr) => {
  const userBuy = arr.filter((user) => {
    if (user.Customers_FullName) {
      return user?.Customers_FullName[0].includes("שולם");
    }
  });
  return userBuy;
};

/***************************/
// Send To Api
/***************************/
export const sendToAPI = async (row) => {
  const url = "https://cors-anywhere.herokuapp.com/https://www.myofficeguy.com/api/crm/data/updateentity/";
  const data = {
    Entity: {
      ID: `${row.id}`,
      Folder: "67379936",
      Customers_FullName: `שולם_${row.name}`,
    },
    CreateIfMissing: false,
    RemoveExistingProperties: false,
    Credentials: {
      CompanyID: num_shop,
      APIKey: key,
    },
  };
  const res = await axios.post(url, data);
  console.log(res);
};

/***************************/
// Change Name To Give
/***************************/

export const ChangeNameToGive = async (row, type_send) => {
  handleClick();
  store.dispatch(removeFromAllNewUserDetailById(row.id));

  console.log(row);
  let msg;
  let urlSticker = await getSricker(row, type_send);
  if (urlSticker.success === true) {
    urlSticker = urlSticker.url;
    console.log(urlSticker);
    redirect_blank(urlSticker);
  } else if (urlSticker.success === false) {
    msg = urlSticker.msg;
    store.dispatch(errMsg(msg));
    console.log(msg);
  }
  handleClose();

  function redirect_blank(url) {
    console.log(url);
    var a = document.createElement("a");
    a.target = "_blank";
    a.href = url;
    console.log(a.href);
    a.click();
  }
};

export const handleClick = () => {
  store.dispatch(setOpenSnack(true));
};

export const handleClose = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }

  store.dispatch(setOpenSnack(false));
};

/***************************/
// Remove From Users By Id
/***************************/

export const removeFromUsersById = (id) => {
  console.log("removeFromUsersById");
  const state = store.getState();
  console.log(state);
  const newUsers = state.users_main.newUsers.filter((user) => user.id !== id);
  return newUsers;
};

/***************************/
// Get Sricker
/***************************/
export const getSricker = async (row, type_send) => {
  let token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL3J1bmNvbS5jby5pbC9jbGFpbXMvY2xpZW50bm8iOiIzMzk5IiwiaHR0cHM6Ly9ydW5jb20uY28uaWwvY2xhaW1zL3BocmFzZSI6IjdhMWExYmMxLTUwMTMtNGMwMS05OTEzLTJlZDk1NjVkMGYwYiIsImV4cCI6MTYwOTE2OTM1MiwiaXNzIjoiaHR0cHM6Ly9ydW5jb20uY28uaWwiLCJhdWQiOiJodHRwczovL3J1bmNvbS5jby5pbCJ9.0BK-7WPhhZvgT05I_3lXbXe-g5zvV8LkFpKdOhHPuHc`;
  // let token = `abc`;

  let url1 = `https://cors-anywhere.herokuapp.com/https://run.hfd.co.il/RunCom.Server/Request.aspx`;
  // let url1 = `abc`;

  console.log(url1);
  console.log(type_send);

  const type_send_func = (type_send) => {
    if (type_send === "משלוח עד הבית") {
      return {
        type: "מסירה",
        num_code_send: 35,
        type_code_send: 10,
        locker: "",
        detail: `${row.item} שם המוצר: ||  ${row.itemQuantity} כמות המוצר:`,
      };
    }
  };
  const type_send_obj = type_send_func(type_send);

  let res = await axios.get(url1, {
    headers: {
      authorization: token,
    },
    params: {
      APPNAME: "run",
      PRGNAME: "ship_create_anonymous",
      ARGUMENTS: `-N3399,-A${type_send_obj.type},-N${type_send_obj.num_code_send},-N5,-A,-A,-N${
        type_send_obj.type_code_send
      },-N,-N,-N,-A${row.name},-A,-A${row.city},-A,-A${row.street},-A${row.num_home},-A,-A,-A,-A${
        row.phone
      },-A,-A,-A,-A,-A${type_send_obj.detail},-A${row.id - 1},-A,-A,-N,-N,-N,-A,-A,-N,-N,-AXML,-A${
        type_send_obj.locker
      },-A,-N,-A,-A,-A`,
    },
  });

  let xmlRes = parseXml(res.data);
  let url2;
  if (xmlRes.success === true) {
    await sendToSetStickerOfficeGuy(row.id, xmlRes.ship_create_num);
    url2 = `https://run.hfd.co.il/RunCom.Server/Request.aspx?APPNAME=run&PRGNAME=ship_print_ws&ARGUMENTS=-N${xmlRes.ship_create_num}`;
    console.log(url2);
    sendToAPI(row);
    return new Promise((resolve, reject) => {
      resolve({ success: true, url: url2 });
    });
  } else {
    return { success: false, msg: xmlRes.error };
  }
};

/***************************/
// Send To Set Sticker Office Guy
/***************************/
export const sendToSetStickerOfficeGuy = async (id, number) => {
  const url = "https://cors-anywhere.herokuapp.com/https://www.myofficeguy.com/api/crm/data/updateentity/";
  const data = {
    Entity: {
      ID: id,
      Folder: "67379936",
      Property_69241918: number,
    },
    CreateIfMissing: false,
    RemoveExistingProperties: false,
    Credentials: {
      CompanyID: num_shop,
      APIKey: key,
    },
  };
  const res = await axios.post(url, data);
  console.log(res);
};

/***************************/
// Parse Xml
/***************************/

export const parseXml = (xml) => {
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(xml, "text/xml");

  let answer = xmlDoc.getElementsByTagName("answer")[0].innerHTML;
  answer = "<ans>" + answer + "</ans>";

  let answerDoc = parser.parseFromString(answer, "text/xml");

  let error = answerDoc.getElementsByTagName("ship_create_error")[0].innerHTML;
  let ship_create_num = answerDoc.getElementsByTagName("ship_create_num")[0].innerHTML;

  console.log(answer);
  console.log(answerDoc);
  console.log(ship_create_num);

  error = error.replace("<![CDATA[", "").replace("]]>", "");
  console.log(error);

  ship_create_num = ship_create_num.replace("<![CDATA[", "").replace("]]>", "");
  console.log(ship_create_num);

  if (ship_create_num !== "0" && ship_create_num !== "") {
    if (error === "") {
      return { success: true, ship_create_num };
    }
  }
  return { success: false, error };
};
