import React, { useState, useEffect } from "react";

import axios from "axios";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import "./AdminMain.styles.scss";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "#f5f5f5",
    height: "100vh",
    width: "100vw",
  },
  paper: {
    height: "75%",
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.main,
  },

  tab: {
    ...theme.tab,
  },
  tabPanel: {
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    width: "20vw",
    height: "50px",
  },
  btnHead: {
    color: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
      color: theme.palette.primary.main,
    },
  },
}));

const MockUser = {
  Data: {
    Entities: [
      {
        ID: 10,
        Customers_FullName: ["יוסף"],
        Customers_Status: [
          {
            ColumnKeys: null,
            Fields: null,
            ID: 67580455,
            Name: "לתת",
            RowKeys: null,
            SchemaID: 66123590,
            Status: 0,
            Version: 0,
          },
        ],
      },
      {
        ID: 11,
        Customers_FullName: ["דוד"],
        Customers_Status: [
          {
            ColumnKeys: null,
            Fields: null,
            ID: 67580455,
            Name: "לתת",
            RowKeys: null,
            SchemaID: 66123590,
            Status: 0,
            Version: 0,
          },
        ],
      },
      {
        ID: 12,
        Customers_FullName: ["אברהם"],
        Customers_Status: [
          {
            ColumnKeys: null,
            Fields: null,
            ID: 67580455,
            Name: "נתתי",
            RowKeys: null,
            SchemaID: 66123590,
            Status: 0,
            Version: 0,
          },
        ],
      },
      {
        ID: 13,
        Customers_FullName: ["יצחק"],
        Customers_Status: [
          {
            ColumnKeys: null,
            Fields: null,
            ID: 67580455,
            Name: "נתתי",
            RowKeys: null,
            SchemaID: 66123590,
            Status: 0,
            Version: 0,
          },
        ],
      },
      {
        ID: 14,
        Customers_FullName: ["משה"],
      },
      {
        ID: 15,
        Customers_FullName: ["אהרון"],
      },
    ],
  },
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
      entity.Property_68515470
    ) {
      return {
        id: entity.ID,
        name: entity.Customers_FullName[0],
        phone: entity.Customers_Phone[0],
        city: entity.Property_68516405[0],
        street: entity.Property_68515460[0],
        num_home: entity.Property_68515470[0],
      };
    }
  });
  console.log(newArr);
  return newArr;
};

const makeArrSimpleEmpty = (arr) => {
  let newArr = [];
  newArr = arr.map((entity) => {
    return { name: entity.Customers_FullName[0], id: entity.ID };
  });

  return newArr;
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

const filterUserByBuy = (arr) => {
  const userBuy = arr.filter((user) => {
    if (user.Customers_FullName) {
      return user?.Customers_FullName[0].includes("שולם");
    }
  });
  return userBuy;
};

const checkUserAfterGive = (arr) => {
  const afterGive = arr.filter((user) => {
    return user?.Billing_Customer[0].Name.includes("הועבר_למשלוח");
  });
  return afterGive;
};

const AdminMain = (props) => {
  // const key = "ZaXmdTsr597vKd2mmY8rN0W9qWPhFrpsfGubh8gKMDqFBL9YLt";
  const key = "aa";

  let num_shop = 67576974;

  /* Styles */
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [startGetSticker, setStartGetSticker] = useState(false);

  const [valueForLable, setValueForLable] = React.useState(0);
  /*         */

  // const [newUserArr, setNewUserArr] = useState([]);
  // const [toSendUserArr, setToSendUserArr] = useState([]);
  // const [afterSendUserArr, setAfterSendUserArr] = useState([]);

  const [allNewUserDetail, setAllNewUserDetail] = useState([]);
  const [allBuyUserDetail, setBuyUserDetail] = useState([]);
  const [sticker, setSticker] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://www.myofficeguy.com/api/crm/data/listentities/";
      const data = {
        Folder: 67380502,
        IncludeInheritedFolders: true,
        LoadProperties: true,
        Credentials: {
          CompanyID: num_shop,
          APIKey: key,
        },
      };
      const { data: resData } = await axios.post(url, data);
      filterData(resData);
    };
    fetchData();

    const fetchAllUser = async () => {
      const url = "https://www.myofficeguy.com/api/crm/data/listentities/";
      const data = {
        Folder: 67379936,
        IncludeInheritedFolders: true,
        LoadProperties: true,
        Credentials: {
          CompanyID: num_shop,
          APIKey: key,
        },
      };
      const { data: resData } = await axios.post(url, data);
      filterUser(resData);
    };
    fetchAllUser();
  }, []);

  /* FOR TEST */
  // useEffect(() => {}, [sticker]);

  const handleChange = (event, newValue) => {
    setValueForLable(newValue);
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
      let allUserBuy = getAllUserBuy(newUser);

      console.log(allNewUserDetail);

      // מעביר את הפרטים לתצוגה
      setAllNewUserDetail(allNewUserDetail);
    }
  };

  const filterUser = (data) => {
    // מקבל את רשימת האנשים שנרשמו
    const arr = data?.Data?.Entities;
    let users;
    if (arr !== undefined) {
      // מחזיר רשימה רק של מי שיש לו בשם "שולם"
      users = makeArrSimpleToGive(arr);
      console.log(users);
      setBuyUserDetail(users);
    }
    return users;
  };

  const sendToAPI = async (row) => {
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

  const getSricker = async (details, type_send) => {
    let token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL3J1bmNvbS5jby5pbC9jbGFpbXMvY2xpZW50bm8iOiIzMzk5IiwiaHR0cHM6Ly9ydW5jb20uY28uaWwvY2xhaW1zL3BocmFzZSI6IjdhMWExYmMxLTUwMTMtNGMwMS05OTEzLTJlZDk1NjVkMGYwYiIsImV4cCI6MTYwOTE2OTM1MiwiaXNzIjoiaHR0cHM6Ly9ydW5jb20uY28uaWwiLCJhdWQiOiJodHRwczovL3J1bmNvbS5jby5pbCJ9.0BK-7WPhhZvgT05I_3lXbXe-g5zvV8LkFpKdOhHPuHc`;

    let url1 = `https://cors-anywhere.herokuapp.com/https://run.hfd.co.il/RunCom.Server/Request.aspx`;

    console.log(url1);
    console.log(type_send);

    const type_send_func = (type_send) => {
      if (type_send === "משלוח עד הבית") {
        return { type: "מסירה", num_code_send: 35, type_code_send: 10, locker: "", detail: `${details.item}` };
      }
      if (type_send === "משלוח ללוקר") {
        return { type: "איסוף", num_code_send: 50, type_code_send: 11, locker: "Y", detail: `${details.item}` };
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
        },-N,-N,-N,-A${details.name},-A,-A${details.city},-A,-A${details.street},-A${details.num_home},-A,-A,-A,-A${
          details.phone
        },-A,-A,-A,-A,-A${type_send_obj.detail},-A${details.id + 1},-A,-A,-N,-N,-N,-A,-A,-N,-N,-ATXT,-A${
          type_send_obj.locker
        },-A,-N,-A,-A,-A`,
      },
    });
    let number;
    let url2;
    console.log(res.data);
    if (isNaN(parseInt(res.data))) {
      let regex = res.data.match(/\d+/g);
      number = regex.slice(-1)[0];
      console.log(number);
      url2 = `https://run.hfd.co.il/RunCom.Server/Request.aspx?APPNAME=run&PRGNAME=ship_print_ws&ARGUMENTS=-N${number}`;
    } else {
      console.log(number);
      number = res.data;
      url2 = `https://run.hfd.co.il/RunCom.Server/Request.aspx?APPNAME=run&PRGNAME=ship_print_ws&ARGUMENTS=-N${number}`;
    }
    url2 = `https://run.hfd.co.il/RunCom.Server/Request.aspx?APPNAME=run&PRGNAME=ship_print_ws&ARGUMENTS=-N${number}`;

    console.log(url2);
    return new Promise((resolve, reject) => {
      resolve(url2);
    });
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
            item: user.Billing_Items[0].Name,
            type_send: user.Billing_Items[1].Name,
          });
        }
      }
    });
    console.log(mainDetailUser);
    return mainDetailUser;
  };

  const getAllUserBuy = (arr) => {};

  const ChangeNameToGive = async (row, type_send) => {
    handleClick();
    console.log(row);
    // sendToAPI(row);
    let urlSticker = await getSricker(row, type_send);
    console.log(urlSticker);

    function redirect_blank(url) {
      console.log(url);
      var a = document.createElement("a");
      a.target = "_blank";
      a.href = url;
      console.log(a.href);
      a.click();
    }
    redirect_blank(urlSticker);
    handleClose();
  };

  // const mockUser2 = [
  //   {
  //     id: 1111,
  //     name: "יוחאי",
  //     city: "בית אל",
  //     street: " סופה ",
  //     num_home: "1",
  //     url: sticker,
  //   },
  // ];

  // getSricker({
  //   id: 1111,
  //   name: "יוחאי",
  //   city: "בית אל",
  //   street: " סופה ",
  //   num_home: "1",
  // });

  const handleChangeName = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar className="d-flex justify-content-center">
          <Button
            className={classes.btnHead}
            disableRipple
            disableElevation
            variant="outlined"
            style={{ fontSize: "1rem", width: "13rem", height: "3rem" }}
            component={Link}
            to="/"
          >
            חזרה לאתר
          </Button>
        </Toolbar>
      </AppBar>
      <div className={`admin-main ${classes.main}`}>
        <Paper className={classes.paper}>
          <Tabs
            value={valueForLable}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            centered
            variant="fullWidth"
          >
            <Tab className={classes.tab} label="קנו וצריך לשלוח ללוקר" />
            <Tab className={classes.tab} label="הועבר המידע לחברת משלוחים" />
            <Tab className={classes.tab} label="קנו וצריך לשלוח רגיל" />
          </Tabs>
          <TabPanel value={valueForLable} index={2}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">צפה במדבקה</TableCell>
                    <TableCell align="right">סוג משלוח</TableCell>
                    <TableCell align="right">פריט</TableCell>
                    <TableCell align="right">עיר</TableCell>
                    <TableCell align="right">רחוב</TableCell>
                    <TableCell align="right">מס בית</TableCell>
                    <TableCell align="right">פלאפון</TableCell>
                    <TableCell align="right">שם \ אימיל</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allNewUserDetail?.map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={uuid()}>
                      <TableCell align="right">
                        {row.type_send !== "איסוף עצמי" ? (
                          <Button variant="contained" onClick={() => ChangeNameToGive(row, row.type_send)}>
                            צפה במדבקה
                          </Button>
                        ) : null}
                      </TableCell>
                      <TableCell align="right">{row.type_send}</TableCell>
                      <TableCell align="right">{row.item}</TableCell>
                      <TableCell align="right">{row.city}</TableCell>
                      <TableCell align="right">{row.street}</TableCell>
                      <TableCell align="right">{row.num_home}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={valueForLable} index={1}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">צפה במדבקה</TableCell>
                    <TableCell align="right">עיר</TableCell>
                    <TableCell align="right">רחוב</TableCell>
                    <TableCell align="right">מס בית</TableCell>
                    <TableCell align="right">פלאפון</TableCell>
                    <TableCell align="right">שם \ אימיל</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allBuyUserDetail.map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={uuid()}>
                      {/* <TableCell align="right">
                        <Button
                          variant="contained"
                          component={"a"}
                          href={`${row.url}`}
                          target="_blank"
                        >
                          צפה במדבקה
                        </Button>
                      </TableCell> */}
                      <TableCell align="right">{row.city}</TableCell>
                      <TableCell align="right">{row.street}</TableCell>
                      <TableCell align="right">{row.num_home}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={valueForLable} index={0}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {/* <TableCell align="right">צפה במדבקה</TableCell> */}
                    <TableCell align="right">עיר</TableCell>
                    <TableCell align="right">רחוב</TableCell>
                    <TableCell align="right">מס בית</TableCell>
                    <TableCell align="right">פלאפון</TableCell>
                    <TableCell align="right">שם \ אימיל</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {afterSendUserArr.map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={uuid()}>
                      <TableCell align="right">{row.address ? row.address : "---"}</TableCell>
                      <TableCell align="right">{row.quantity ? row.quantity : "---"}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          {valueForLable === 2 && (
            <Box className="d-flex flex-column align-items-center">
              <Typography className="mb-3 admin">להעביר את המידע לחברת המשלוחים</Typography>
              {/* <Button
                onClick={() => sendToAPI(newUserArr, "toGive")}
                className={classes.btn}
                variant="contained"
                color="secondary"
              >
                שלח
              </Button> */}
            </Box>
          )}
          {valueForLable === 1 && (
            <Box className="d-flex flex-column align-items-center">
              <Typography className="mb-3 admin">חברת המשלוחים אספה את ההזמנות</Typography>
              {/* <Button
                onClick={() => sendToAPI(toSendUserArr, "afterGive")}
                className={classes.btn}
                variant="contained"
                color="secondary"
              >
                הועבר לחברת המשלוחים
              </Button> */}
            </Box>
          )}
          {valueForLable === 0 && (
            <Box className="d-flex flex-column align-items-center">
              {/* <Typography className="mb-3 admin"> {afterSendUserArr.length} סך ההזמנות שהצליחו: </Typography> */}
            </Box>
          )}
        </Paper>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          אנא המתן עד שתועבר לדף
        </Alert>
      </Snackbar>
    </>
  );
};

export default AdminMain;

function TabPanel(props) {
  const { children, value, index } = props;
  const classes = useStyles();

  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box className={classes.tabPanel} p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Alert(props) {
  return <MuiAlert autoHideDuration={300} elevation={6} variant="filled" {...props} />;
}
