import { Box } from "@material-ui/core";
import React from "react";
import CartItem from "./CartItem";

function CartList({ cartList }) {
  return (
    <Box component="ul" padding="20px">
      {cartList.map((cartItem) => (
        <li key={cartItem.id}>
          <CartItem cartItem={cartItem} />
        </li>
      ))}
    </Box>
  );
}

export default CartList;
