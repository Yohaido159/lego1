import { combineReducers } from "redux";

import cartReducer from "./cart/cart.reducer";
import usersReducer from "./users/users.reducer";

export default combineReducers({
  cart_main: cartReducer,
  users_main: usersReducer,
});
