import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import emptyCartImg from "../../../imgs/empty-cart.PNG";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  img: {},
  title: {},
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: "#FDD010",

    "&:hover": {
      backgroundColor: "#FDD010",
    },
  },
}));

function EmptyCart(props) {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = () => {
    history.push("/products");
  };

  return (
    <Box className={classes.root}>
      <img src={emptyCartImg} alt="" />
      <Typography variant="body1" color="initial">
        Không có sản phẩm nào trong giỏ hàng của bạn.
      </Typography>
      <Button
        className={classes.button}
        variant="contained"
        onClick={handleClick}
      >
        Tiếp tục mua sắm
      </Button>
    </Box>
  );
}

export default EmptyCart;
