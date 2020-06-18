import React, { useReducer, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { useDispatch } from "react-redux";
import { setCartItems } from "../../redux/cart/cart.actions";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const cartObj = {
  cardNumber: null,
  cardCVC: null,
  cardEXP: null,
};

export default function PaymentForm({ errorObj }) {
  const reducer = (state, new_state) => ({ ...state, ...new_state });
  const [selectedDate, handleDateChange] = useState(new Date());

  const [cart, setCart] = useReducer(reducer, {
    ...cartObj,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCart({ [name]: value });
  };

  console.log(cart);

  useEffect(() => {
    dispatch(setCartItems(cart));
  }, [cart]);

  const handleDateChangeFunc = (e) => {
    let mount = e.getMonth() + 1;
    let year = e.getFullYear();
    setCart({ cardEXPMount: mount, cardEXPYear: year });
    handleDateChange(e);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        פרטי תשלום
      </Typography>
      <Grid container spacing={3} dir="rtl">
        <Grid item xs={12}>
          <TextField
            type="number"
            name="cardNumber"
            onChange={handleChange}
            required
            id="cardNumber"
            label="מספר הכרטיס"
            fullWidth
            error={errorObj?.cardNumber?.error}
            helperText={errorObj?.cardNumber?.error ? errorObj.cardNumber.errorMessage : ""}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              value={selectedDate}
              onChange={handleDateChangeFunc}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              error={errorObj?.cardEXP?.error}
              helperText={errorObj?.cardEXP?.error ? errorObj.cardEXP.errorMessage : "תאריך תפוגה"}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="number"
            name="cardCVC"
            required
            id="cvv"
            label="CVV"
            fullWidth
            onChange={handleChange}
            autoComplete="cc-csc"
            error={errorObj?.cardCVC?.error}
            helperText={errorObj?.cardCVC?.error ? errorObj.cardCVC.errorMessage : "שלושת הספרות האחוריות בגב הכרטיס"}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
