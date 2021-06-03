import { Container, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import CartCheckout from "../components/CartCheckout";
import CartList from "../components/CartList";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  right: {
    width: "250px",
  },
  left: {
    flex: "1 1 0",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    padding: `${theme.spacing(1)}px 0`,
  },
}));

function CartPage(props) {
  const classes = useStyles();
  const cartList = useSelector((state) => state.cart.cartList);
  return (
    <Container className={classes.root}>
      <Grid container spacing="1">
        <Grid item className={classes.left}>
          <Paper elevation={1}>
            <CartList cartList={cartList} />
          </Paper>
        </Grid>
        <Grid item className={classes.right}>
          <Paper elevation={1}>
            <CartCheckout />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CartPage;
