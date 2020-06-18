import React, { useState, useReducer } from "react";

import axios from "axios";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import Checkout from "./Checkout";

import "./ModalBuy.styles.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const ModalBuy = (props) => {
  const classes = useStyles();

  const [res, setRes] = useState();
  const reducer = (state, new_state) => ({ ...state, ...new_state });
  const [loginInput, setloginInput] = useReducer(reducer, {
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setloginInput({ [name]: value });
  };

  const setAddress = (e) => {
    console.log("dd");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", loginInput.email);
    formData.append("password", loginInput.password);

    const data = await axios.post("http://127.0.0.1:8000/auth/login/", formData);
    setRes(data);
    if (data.status === 200) {
      window.localStorage.setItem("token", data.data.token);
      window.location.reload();
    }
  };

  return (
    <div id="loginModal" className="modal">
      <div className="modal-dialog modal-lg d-flex justify-content-center">
        <div className="modal-content">
          <Checkout setAddress={setAddress} dir="rtl" />
        </div>
      </div>
    </div>
  );
};

export default ModalBuy;
