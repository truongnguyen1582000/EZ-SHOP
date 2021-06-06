import { Box, makeStyles, Typography } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { PLACEHOLDER_IMG, STATIC_HOST } from "constant";
import { formatPrice } from "features/Product/utils";
import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, setQuantity } from "../cartSlice";
import CartItemQuantity from "./CartItemQuantity";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
  },
  img: {
    maxWidth: "130px",
  },
  productName: {
    width: "200px",
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
  quantityField: {
    marginLeft: "auto",
  },
  deleteIcon: {
    fontSize: "30px",
    alignSelf: "center",
    cursor: "pointer",
  },
}));

function CartItem({ cartItem }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const imgUrl = cartItem.product.thumbnail
    ? `${STATIC_HOST}${cartItem.product.thumbnail?.url}`
    : PLACEHOLDER_IMG;

  const handleQuantityItemChange = (value) => {
    console.log(value);
    dispatch(setQuantity({ id: cartItem.id, quantity: value }));
  };

  const handleDeleteItem = () => {
    dispatch(removeFromCart(cartItem.id));
  };

  return (
    <Box className={classes.root}>
      <img className={classes.img} src={imgUrl} alt={cartItem.product.name} />
      <Typography
        component="span"
        className={classes.productName}
        variant="body2"
        color="initial"
      >
        {cartItem.product.name}
      </Typography>
      <Typography
        component="span"
        className={classes.productName}
        variant="body2"
        color="initial"
      >
        {formatPrice(cartItem.product.salePrice)}
      </Typography>
      <form className={classes.quantityField}>
        <CartItemQuantity
          value={cartItem.quantity}
          name="quantity"
          onChange={handleQuantityItemChange}
        />
      </form>
      <DeleteOutlineIcon
        onClick={handleDeleteItem}
        className={classes.deleteIcon}
      />
    </Box>
  );
}

export default CartItem;
