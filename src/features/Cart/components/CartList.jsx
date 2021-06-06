import { Box } from "@material-ui/core";
import React from "react";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

function CartList({ cartList }) {
  return (
    <Box component="ul" padding="20px">
      {cartList.length === 0 && <EmptyCart />}
      {cartList.map((cartItem) => (
        <li key={cartItem.id}>
          <CartItem cartItem={cartItem} />
        </li>
      ))}
    </Box>
  );
}

export default CartList;
