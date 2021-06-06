import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
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
  btn: {
    backgroundColor: "#FF424E",

    "&:hover": {
      backgroundColor: "#FF424E",
    },
  },
}));

function CartPage(props) {
  const classes = useStyles();
  const cartList = useSelector((state) => state.cart.cartList);
  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        <Grid item className={classes.left}>
          <Paper elevation={1}>
            <CartList cartList={cartList} />
          </Paper>
        </Grid>
        <Grid item className={classes.right}>
          <Paper elevation={1}>
            <CartCheckout />
          </Paper>

          <Box marginTop={2}>
            <Button className={classes.btn} fullWidth variant="contained">
              Tiến hành đặt hàng
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CartPage;
