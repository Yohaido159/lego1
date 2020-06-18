import React, { useReducer, useEffect, useRef, forwardRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import { useDispatch } from "react-redux";
import { setCartItems } from "../../redux/cart/cart.actions";

const useStyles = makeStyles((theme) => ({}));

const cartObj = {
  name: null,
  email: null,
  phone: null,
  shipStreet: null,
  shipCity: null,
};

const AddressForm = ({ errorObj }) => {
  console.log(errorObj);
  const reducer = (state, new_state) => ({ ...state, ...new_state });
  const [cart, setCart] = useReducer(reducer, {
    ...cartObj,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCart({ [name]: value });
  };

  const handleAddress = (e) => {
    console.log(e);
    let street = e.terms[0].value;
    let city = e.terms[1].value;
    setCart({ shipStreet: street, shipCity: city });
  };

  console.log(cart);

  useEffect(() => {
    dispatch(setCartItems(cart));
  }, [cart]);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        כתובת למשלוח
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} dir="rtl">
          <TextField
            onChange={handleChange}
            required
            id="Name"
            name="name"
            label="שם הלקוח"
            dir="rtl"
            fullWidth
            error={errorObj?.name?.error}
            helperText={errorObj?.name?.error ? errorObj.name.errorMessage : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="number"
            onChange={handleChange}
            required
            id="phone"
            name="phone"
            label="פלאפון"
            fullWidth
            error={errorObj?.phone?.error}
            helperText={errorObj?.phone?.error ? errorObj.phone.errorMessage : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <GooglePlacesAutocomplete placeholder="הזן שם רחוב + עיר" onSelect={handleAddress} />
        </Grid>
        <Grid item xs={5}>
          <TextField
            type="number"
            onChange={handleChange}
            required
            id="shipNumHome"
            name="shipNumHome"
            label="מס' בית"
            fullWidth
            error={errorObj?.numHome?.error}
            helperText={errorObj?.numHome?.error ? errorObj.numHome.errorMessage : ""}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            error={errorObj?.email?.error}
            helperText={errorObj?.email?.error ? errorObj.email.errorMessage : ""}
            type="email"
            onChange={handleChange}
            required
            id="email"
            name="email"
            label="מייל"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AddressForm;
