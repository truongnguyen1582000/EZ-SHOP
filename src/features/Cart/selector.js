import { createSelector } from "reselect";

const cartListSelector = (state) => state.cart.cartList;

export const cartListCountSlector = createSelector(
  cartListSelector,
  (cartItem) => cartItem.reduce((count, item) => (count += 1), 0)
);

export const cartTotalSlector = createSelector(cartListSelector, (cartItem) =>
  cartItem.reduce(
    (count, item) => count + item.quantity * item.product.salePrice,
    0
  )
);
