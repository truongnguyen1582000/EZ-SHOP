import { createSlice } from "@reduxjs/toolkit";
import StorageKeys from "constant/storageKeys";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    showMiniCart: false,
    cartList: JSON.parse(localStorage.getItem(StorageKeys.CART)) || [],
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

      localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cartList));
    },
    setQuantity(state, action) {
      console.log(action.payload);
      const { id, quantity } = action.payload;
      const index = state.cartList.findIndex((x) => x.id === id);
      if (index >= 0) {
        state.cartList[index].quantity = quantity;
      }
      localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cartList));
    },
    removeFromCart(state, action) {
      const idNeedToRemove = action.payload;
      console.log(idNeedToRemove);
      state.cartList = state.cartList.filter((x) => x.id !== idNeedToRemove);
      localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cartList));
    },
  },
});

const { reducer, actions } = cartSlice;
export const {
  setQuantity,
  showMiniCart,
  hideMiniCart,
  addToCart,
  removeFromCart,
} = actions;
export default reducer;
