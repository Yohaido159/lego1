import React, { useState, useReducer, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

import { useDispatch, useSelector } from "react-redux";
import { sendToBuyStart } from "../../redux/cart/cart.actions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["כתובת למשלוח", "פרטי תשלום", "סיכום"];

function getStepContent(step, errorObj) {
  switch (step) {
    case 0:
      return <AddressForm errorObj={errorObj} />;
    case 1:
      return <PaymentForm errorObj={errorObj} />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const error = {};

export default function Checkout() {
  const reducer = (state, new_state) => ({ ...state, ...new_state });
  const [errorObj, setErrorObj] = useReducer(reducer, {
    ...error,
  });
  const [endObjError, setEndErrorObj] = useState(false);
  const [number, setNumber] = useState(1);
  console.log(errorObj);
  const cart = useSelector((state) => state.cart_main);

  const a = React.createRef(null);

  const dispatch = useDispatch();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleBuy = () => {
    console.log("hi");
    dispatch(sendToBuyStart());
    setActiveStep(activeStep + 1);
  };

  const handleError = (item, name, msg) => {
    if (item === null || "") {
      setErrorObj({
        [name]: {
          error: true,
          errorMessage: msg,
        },
      });
    } else {
      setErrorObj({
        [name]: {
          error: false,
          errorMessage: "",
        },
      });
    }
  };

  const handleNextStart = () => {
    const { name, email, phone, shipNumHome, cardNumber, cardCVC, cardEXPYear, cardEXPMount } = cart;

    if (activeStep === 0) {
      handleError(name, "name", "צריך להזין שם");
      handleError(email, "email", "צריך להזין אימיל");
      handleError(phone, "phone", "צריך להזין צריך להזין פלאפון");
      handleError(shipNumHome, "numHome", "צריך להזין מס' בית");
    }

    if (activeStep === 1) {
      handleError(cardNumber, "cardNumber", "צריך להזין מס כרטיס");
      handleError(cardCVC, "cardCVC", "צריך להזין CVC");
      handleError(cardEXPYear, "cardEXP", "צריך להזין תוקף");
      handleError(cardEXPMount, "cardEXP", "צריך להזין תוקף");
    }

    console.log(cart);

    console.log("before end");

    setNumber(number + 1);
    setEndErrorObj(number);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    console.log(endObjError);
    if (endObjError > 0) {
      let errorArr = [];
      Object.keys(errorObj).map((e) => errorArr.push(errorObj[e].error));
      console.log(errorArr);

      if (!errorArr.includes(true)) {
        setActiveStep(activeStep + 1);
      }
    }
  }, [endObjError]);

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            לרכישה
          </Typography>
          <Stepper dir="ltr" activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  תודה על ההזמנה.
                </Typography>
                <Typography variant="subtitle1">ההזמנה נקלטה במערכת ובימים הקרובים תשלח אליך</Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, errorObj)}
                <div dir="ltr" className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      הקודם
                    </Button>
                  )}
                  {activeStep < steps.length - 1 && (
                    <Button variant="contained" color="primary" onClick={handleNextStart} className={classes.button}>
                      הבא
                    </Button>
                  )}
                  {activeStep === steps.length - 1 && (
                    <Button variant="contained" color="primary" onClick={handleBuy} className={classes.button}>
                      בצע רכישה
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
