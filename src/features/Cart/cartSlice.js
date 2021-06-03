import { createSlice } from "@reduxjs/toolkit";
import StorageKeys from "constant/storageKeys";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    showMiniCart: false,
    cartList: localStorage.getItem(StorageKeys.CART) || [],
  },
  reducers: {
    showMiniCart: (state) => {
      state.showMiniCart = true;
    },
    hideMiniCart: (state) => {
      state.showMiniCart = false;
    },
    addToCart(state, action) {
      const item = action.payload;
      const index = state.cartList.findIndex((x) => x.id === item.id);
      if (index >= 0) {
        state.cartList[index].quantity += item.quantity;
      } else {
        state.cartList.push(item);
      }
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cartList.findIndex((x) => x.id === id);
      if (index >= 0) {
        state.quantity[index] = quantity;
      }
    },
    removeFromCart(state, action) {
      const idNeedToRemove = action.payload;
      state.cartList = state.filters((x) => x.id !== idNeedToRemove);
      localStorage.setItem(StorageKeys.CART, state);
    },
  },
});

const { reducer, actions } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart } = actions;
export default reducer;
