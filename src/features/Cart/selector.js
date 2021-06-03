import { createSelector } from "reselect";

const cartListSelector = (state) => state.cart.cartList;

export const cartListCountSlector = createSelector(
  cartListSelector,
  (cartItem) => cartItem.reduce((count, item) => (count += item.quantity), 0)
);

export const cartTotalSlector = createSelector(cartListSelector, (cartItem) =>
  cartItem.reduce((count, item) => (count += item.quantity * item.salePrice), 0)
);
