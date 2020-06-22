import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

import { useSelector, useDispatch } from "react-redux";
import { setCartItems } from "../../redux/cart/cart.actions";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const cart = useSelector((state) => state.cart_main);
  const classes = useStyles();

  console.log(cart);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        סיכום ההזמנה
      </Typography>
      <List dir="rtl" disablePadding>
        <ListItem className={classes.listItem}>
          <Typography>{`הפריט:  ${cart.itemName}`}</Typography>
          <ListItemText primary={cart.itemPrice} />
        </ListItem>
        <ListItem className={classes.listItem}>
          <Typography>{`כמות:`}</Typography>
          <ListItemText primary={cart.itemQuantity} />
        </ListItem>
        <ListItem className={classes.listItem}>
          <Typography>{`סוג משלוח:  ${cart.type_send}`}</Typography>
          <ListItemText primary={cart.shipPrice} />
        </ListItem>

        <ListItem className={classes.listItem}>
          <Typography className={classes.total}>סך הכל</Typography>
          <ListItemText
            className={classes.total}
            primary={parseFloat(cart.shipPrice) + parseFloat(cart.itemPrice) * parseFloat(cart.itemQuantity)}
          />
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} className="text-center">
          <Typography variant="h6" gutterBottom className={`${classes.title}`}>
            שם + משלוח לכתובת
          </Typography>
          <Typography gutterBottom>{cart.name}</Typography>
          <Typography gutterBottom>{`${cart.shipStreet} ${cart.shipCity}`}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
