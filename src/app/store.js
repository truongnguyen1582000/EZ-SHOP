import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/Auth/userSlice";
import cartReducer from "../features/Cart/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
