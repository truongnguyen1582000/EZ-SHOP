import { Box, Typography } from "@material-ui/core";
import { formatPrice } from "features/Product/utils";
import React from "react";
import { useSelector } from "react-redux";
import { cartTotalSlector } from "../selector";

function CartCheckout(props) {
  const totalPrice = useSelector(cartTotalSlector);
  return (
    <Box
      padding={2}
      display="flex"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <Typography variant="subtitle1" color="initial">
        Tổng cộng:{" "}
      </Typography>
      <Typography style={{ fontWeight: "bold" }} variant="h6" color="error">
        {formatPrice(totalPrice)}
      </Typography>
    </Box>
  );
}

export default CartCheckout;
