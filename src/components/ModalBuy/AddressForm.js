import React, { useReducer, useEffect, useRef, forwardRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import { useDispatch } from "react-redux";
import { setCartItems } from "../../redux/cart/cart.actions";

import { checkIfValid } from "./ModalBuy.utils";

const useStyles = makeStyles((theme) => ({}));

const cartObj = {
  name: null,
  email: null,
  phone: null,
  shipStreet: null,
  shipCity: null,
  shipPrice: 45,
  shipNumHome: null,
  type_send: "משלוח עד הבית",
  itemQuantity: "1",
};

const AddressForm = ({ errorObj }) => {
  const [value, setValue] = React.useState("משלוח עד הבית");
  const [valueQuntity, setValueQuntity] = React.useState("1");

  console.log(errorObj);
  const reducer = (state, new_state) => ({ ...state, ...new_state });
  const [cart, setCart] = useReducer(reducer, {
    ...cartObj,
  });

  const dispatch = useDispatch();

  const handleChangeRadio = (event) => {
    setValue(event.target.value);
    if (event.target.value === "איסוף עצמי") {
      setCart({ shipStreet: "ריק", shipCity: "ריק", shipNumHome: "5", shipPrice: 0, type_send: "איסוף עצמי" });
    }
    if (event.target.value === "משלוח עד הבית") {
      setCart({ shipStreet: null, shipCity: null, shipNumHome: null, shipPrice: 45, type_send: "משלוח עד הבית" });
    }
    if (event.target.value === "משלוח ללוקר") {
      setCart({ shipStreet: null, shipCity: null, shipNumHome: "ריק", shipPrice: 25, type_send: "משלוח ללוקר" });
    }
  };

  const handleChangeRadioQuntity = (e) => {
    setValueQuntity(e.target.value);
    setCart({ itemQuantity: e.target.value });
  };

  console.log(valueQuntity);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCart({ [name]: value });
  };

  const handleAddress = (e) => {
    console.log(e);
    const cityValid = checkIfValid(e.terms[1].value);

    let street = e.terms[0].value;
    let city = cityValid ? e.terms[1].value : e?.terms[2].value;

    console.log(city);
    console.log(street);

    setCart({ shipStreet: street, shipCity: city });
  };

  console.log(cart);

  useEffect(() => {
    dispatch(setCartItems(cart));
  }, [cart]);

  useEffect(() => {
    setCart({ type_send: value });
  }, [value]);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        כתובת למשלוח
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">בחר שיטת שילוח</FormLabel>
            <RadioGroup aria-label="shipping" name="gender1" value={value} onChange={handleChangeRadio}>
              <FormControlLabel
                value="איסוף עצמי"
                control={<Radio />}
                label=" איסוף עצמי מכתובת: סמטת הגן 10, אור יהודה"
              />
              <FormControlLabel value="משלוח ללוקר" control={<Radio />} label="משלוח ללוקר" />
              <FormControlLabel value="משלוח עד הבית" control={<Radio />} label="משלוח עד הבית" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">סך הפריטים</FormLabel>
            <RadioGroup row name="quntity" value={valueQuntity} onChange={handleChangeRadioQuntity}>
              <FormControlLabel value="1" control={<Radio />} label="פריט 1" />

              <FormControlLabel value="2" control={<Radio />} label="2 פריטים" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <React.Fragment>
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
          {value !== "איסוף עצמי" ? (
            <Grid item xs={12}>
              <GooglePlacesAutocomplete placeholder="הזן שם רחוב + עיר" onSelect={handleAddress} />
            </Grid>
          ) : null}
          {value === "משלוח עד הבית" && (
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
          )}
          <Grid item xs={value === "משלוח עד הבית" ? 7 : 12}>
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
          </Grid>{" "}
        </React.Fragment>
      </Grid>
    </React.Fragment>
  );
};

export default AddressForm;
