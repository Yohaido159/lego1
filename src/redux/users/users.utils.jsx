import React from "react";
import axios from "axios";
import { setAllNewUserDetail, setBuyUserDetail, setOpenSnack, errMsg } from "./users.actions";

import store from "../../redux/store";

const key = "ZaXmdTsr597vKd2mmY8rN0W9qWPhFrpsfGubh8gKMDqFBL9YLt";
const num_shop = 67576974;

/***************************/
// when started - 1
/***************************/

export const fetchData = async () => {
  const url = "https://www.myofficeguy.com/api/crm/data/listentities/";
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

const filterData = (data) => {
  console.log(data);
  const arr = data?.Data?.Entities;
  console.log(arr);
  if (arr !== undefined) {
    // לוקח את כל המשתמשים
    let newUserBuyArr = arr.filter((entity) => entity.Billing_Valid !== undefined);
    console.log(newUserBuyArr);

    // מכניס רק את מי שיש לו שם
    let newUserWithName = newUserBuyArr.filter((entity) => entity.Billing_Customer !== undefined);

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

const checkUserReturnEmpty = (arr) => {
  const newUser = arr.filter((user) => {
    return !user?.Billing_Customer[0].Name.includes("שולם") && !user?.Billing_Customer[0].Name.includes("הועבר_למשלוח");
  });
  return newUser;
};

const checkUserBuy = (arr) => {
  const userBuy = arr.filter((user) => {
    if (user.Billing_Customer) {
      return user?.Billing_Customer[0].Name.includes("שולם");
    }
  });
  return userBuy;
};

const getAllNewUserDetail = (arr) => {
  let mainDetailUser = [];

  let url = "https://www.myofficeguy.com/api/crm/data/getentity/";

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

      if (
        res.data.Data?.Entity?.Property_68516405 &&
        res.data.Data?.Entity?.Property_68515460 &&
        res.data.Data?.Entity?.Property_68515470 &&
        res.data.Data?.Entity?.Property_69190176 &&
        res.data.Data?.Entity?.Property_69190511 &&
        res.data.Data?.Entity?.Property_69190538 &&
        res.data.Data?.Entity?.Customers_FullName &&
        res.data.Data?.Entity?.Customers_Phone &&
        user.Billing_Items
      ) {
        mainDetailUser.push({
          id: res.data.Data?.Entity?.ID,
          name: res.data.Data?.Entity?.Customers_FullName[0],
          phone: res.data.Data?.Entity?.Customers_Phone[0],
          city: res.data.Data?.Entity?.Property_68516405[0],
          street: res.data.Data?.Entity?.Property_68515460[0],
          num_home: res.data.Data?.Entity?.Property_68515470[0],
          itemQuantity: res.data.Data?.Entity?.Property_69190176[0],
          item: res.data.Data?.Entity?.Property_69190511[0],
          type_send: res.data.Data?.Entity?.Property_69190538[0],
        });
      }
    }
  });
  console.log(mainDetailUser);
  return mainDetailUser;
};

/***************************/
// when started - 2
/***************************/
export const fetchAllUser = async () => {
  const url = "https://www.myofficeguy.com/api/crm/data/listentities/";
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

const filterUser = (data) => {
  // מקבל את רשימת האנשים שנרשמו
  const arr = data?.Data?.Entities;
  let users;
  if (arr !== undefined) {
    // מחזיר רשימה רק של מי שיש לו בשם "שולם"
    users = makeArrSimpleToGive(arr);
    console.log(users);
    //   setBuyUserDetail(users);
    store.dispatch(setBuyUserDetail(users));
  }
  return users;
};

const makeArrSimpleToGive = (arr) => {
  let newArr = [];
  console.log(arr);
  newArr = filterUserByBuy(arr);
  console.log(newArr);

  newArr = newArr.map((entity) => {
    if (
      entity.ID &&
      entity.Customers_FullName &&
      entity.Customers_Phone &&
      entity.Property_68516405 &&
      entity.Property_68515460 &&
      entity.Property_68515470 &&
      entity.Property_69190176 &&
      entity.Property_69190511 &&
      entity.Property_69190538
    ) {
      return {
        id: entity.ID,
        name: entity.Customers_FullName[0],
        phone: entity.Customers_Phone[0],
        city: entity.Property_68516405[0],
        street: entity.Property_68515460[0],
        num_home: entity.Property_68515470[0],
        itemQuantity: entity.Property_69190176[0],
        item: entity.Property_69190511[0],
        type_send: entity.Property_69190538[0],
      };
    }
  });
  console.log(newArr);
  return newArr;
};

const filterUserByBuy = (arr) => {
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
  const url = "https://www.myofficeguy.com/api/crm/data/updateentity/";
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
  console.log(row);
  let msg;
  let urlSticker = await getSricker(row, type_send);
  if (urlSticker.success === true) {
    handleClick();
    urlSticker = urlSticker.url;
    console.log(urlSticker);
    redirect_blank(urlSticker);
    handleClose();
  } else if (urlSticker.success === false) {
    msg = urlSticker.msg;
    store.dispatch(errMsg(msg));
    console.log(msg);
  }

  function redirect_blank(url) {
    console.log(url);
    var a = document.createElement("a");
    a.target = "_blank";
    a.href = url;
    console.log(a.href);
    a.click();
  }
};

const handleClick = () => {
  store.dispatch(setOpenSnack(true));
};

export const handleClose = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }

  store.dispatch(setOpenSnack(false));
};
/***************************/
// Get Sricker
/***************************/
const getSricker = async (row, type_send) => {
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
// Parse Xml
/***************************/

const parseXml = (xml) => {
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
