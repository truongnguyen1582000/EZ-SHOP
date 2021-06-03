import { Box, makeStyles, Typography } from "@material-ui/core";
import QuantifyField from "components/form-control/QuantityField";
import { PLACEHOLDER_IMG, STATIC_HOST } from "constant";
import { formatPrice } from "features/Product/utils";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  quantity: yup
    .number()
    .min(1, "Minimun value is 1.")
    .required("Please enter quantity.")
    .typeError("Please enter a number."),
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  img: {
    maxWidth: "130px",
  },
  productName: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
}));

function CartItem({ cartItem }) {
  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      quantity: cartItem.quantity,
    },
    resolver: yupResolver(schema),
  });

  const imgUrl = cartItem.product.thumbnail
    ? `${STATIC_HOST}${cartItem.product.thumbnail?.url}`
    : PLACEHOLDER_IMG;

  return (
    <Box className={classes.root}>
      <img className={classes.img} src={imgUrl} alt={cartItem.product.name} />
      <Typography
        className={classes.productName}
        variant="body2"
        color="initial"
      >
        {cartItem.product.name}
      </Typography>
      <Typography
        className={classes.productName}
        variant="body2"
        color="initial"
      >
        {formatPrice(cartItem.product.salePrice)}
      </Typography>
      <QuantifyField name="quantity" form={form} />
    </Box>
  );
}

export default CartItem;
