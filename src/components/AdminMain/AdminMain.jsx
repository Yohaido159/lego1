import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsersFormApiStart, setOpenSnack } from "../../redux/users/users.actions";
import { ChangeNameToGive, sendToAPI, handleClose } from "../../redux/users/users.utils";

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

const makeArrSimpleEmpty = (arr) => {
  let newArr = [];
  newArr = arr.map((entity) => {
    return { name: entity.Customers_FullName[0], id: entity.ID };
  });

  return newArr;
};

const AdminMain = (props) => {
  const dispatch = useDispatch();
  const newUsers = useSelector((state) => state.users_main.newUsers);
  const oldUsers = useSelector((state) => state.users_main.oldUsers);
  const open = useSelector((state) => state.users_main.OpenSnack);
  const errMsg = useSelector((state) => state.users_main.errMsg);

  /* Styles */
  const classes = useStyles();

  const [valueForLable, setValueForLable] = React.useState(0);
  /*         */

  useEffect(() => {
    dispatch(fetchUsersFormApiStart());
  }, []);

  const handleChange = (event, newValue) => {
    setValueForLable(newValue);
  };

  const fakeUser = [
    {
      city: "בית אל",
      id: 68627396,
      item: "בדיקה",
      name: "יוחאי",
      num_home: "3",
      phone: "0549410031",
      street: "sufa street",
      type_send: "משלוח עד הבית",
    },
    {
      city: "בית אל",
      id: 68627901,
      item: "בדיקה",
      name: "הי",
      num_home: "5",
      phone: "0549410031",
      street: "יותם",
      type_send: "משלוח ללוקר",
    },
  ];

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
            <Tab className={classes.tab} label="הועבר המידע לחברת משלוחים" />
            <Tab className={classes.tab} label="קנו וצריך לשלוח רגיל" />
          </Tabs>
          <TabPanel value={valueForLable} index={1}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">צפה במדבקה</TableCell>
                    <TableCell align="right">סוג משלוח</TableCell>
                    <TableCell align="right">כמות</TableCell>
                    <TableCell align="right">פריט</TableCell>
                    <TableCell align="right">עיר</TableCell>
                    <TableCell align="right">רחוב</TableCell>
                    <TableCell align="right">מס בית</TableCell>
                    <TableCell align="right">פלאפון</TableCell>
                    <TableCell align="right">איימיל</TableCell>
                    <TableCell align="right">שם</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newUsers?.map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={uuid()}>
                      <TableCell align="right">
                        {row.type_send !== "איסוף עצמי" && row.type_send !== "משלוח ללוקר" ? (
                          <React.Fragment>
                            <Button variant="contained" onClick={() => ChangeNameToGive(row, row.type_send)}>
                              צפה במדבקה
                            </Button>
                            {errMsg && (
                              <Button variant="contained" onClick={() => sendToAPI(row)}>
                                להעביר לשולם
                              </Button>
                            )}
                          </React.Fragment>
                        ) : (
                          <Button variant="contained" onClick={() => sendToAPI(row)}>
                            העבר לשולם
                          </Button>
                        )}
                      </TableCell>
                      <TableCell align="right">{row?.type_send}</TableCell>
                      <TableCell align="right">{row?.itemQuantity}</TableCell>
                      <TableCell align="right">{row?.item}</TableCell>
                      <TableCell align="right">{row.city}</TableCell>
                      <TableCell align="right">{row.street}</TableCell>
                      <TableCell align="right">{row.num_home}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
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
                    <TableCell align="right">צפה במדבקה</TableCell>
                    <TableCell align="right">סוג משלוח</TableCell>
                    <TableCell align="right">כמות</TableCell>
                    <TableCell align="right">שם המוצר</TableCell>
                    <TableCell align="right">עיר</TableCell>
                    <TableCell align="right">רחוב</TableCell>
                    <TableCell align="right">מס בית</TableCell>
                    <TableCell align="right">פלאפון</TableCell>
                    <TableCell align="right">איימיל</TableCell>
                    <TableCell align="right">שם</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {oldUsers.map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={uuid()}>
                      <TableCell align="right">
                        {row?.sticker !== "ריק" ? (
                          <Button
                            variant="contained"
                            component={"a"}
                            target="_blank"
                            href={`https://run.hfd.co.il/RunCom.Server/Request.aspx?APPNAME=run&PRGNAME=ship_print_ws&ARGUMENTS=-N${row?.sticker}`}
                            rel="noopener noreferrer"
                          >
                            צפה במדבקה שכבר נקלטה
                          </Button>
                        ) : (
                          "----"
                        )}
                      </TableCell>
                      <TableCell align="right">{row?.type_send}</TableCell>
                      <TableCell align="right">{row?.itemQuantity}</TableCell>
                      <TableCell align="right">{row?.item}</TableCell>
                      <TableCell align="right">{row?.city}</TableCell>
                      <TableCell align="right">{row?.street}</TableCell>
                      <TableCell align="right">{row?.num_home}</TableCell>
                      <TableCell align="right">{row?.phone}</TableCell>
                      <TableCell align="right">{row?.email}</TableCell>
                      <TableCell align="right">{row?.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {valueForLable === 1 && (
            <Box className="d-flex flex-column align-items-center">
              <Typography className="mb-3 admin">להעביר את המידע לחברת המשלוחים</Typography>
              {errMsg && (
                <>
                  <Typography className="mb-3 admin">שגיאה</Typography> <br />
                  <p className="black"> {errMsg} </p>
                </>
              )}
            </Box>
          )}
          {valueForLable === 0 && (
            <Box className="d-flex flex-column align-items-center">
              <Typography className="mb-3 admin">חברת המשלוחים אספה את ההזמנות</Typography>
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
