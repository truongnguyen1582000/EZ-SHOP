import {
  Avatar,
  Badge,
  Box,
  Dialog,
  DialogActions,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Login from "features/Auth/components/Login";
import Register from "features/Auth/components/Register";
import { logout } from "features/Auth/userSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { cartListCountSlector } from "../features/Cart/selector";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#990073",
  },
  title: {
    marginLeft: theme.spacing(1),
  },
  logo: {
    marginRight: "auto",
  },
  link: {
    textDecoration: "none",
    color: "white",
    display: "flex",
    alignItems: "center",
  },
  btn: {
    "&:hover": {
      color: "cyan",
    },
  },
  closeBtn: {
    position: "absolute",
    top: "0",
    right: "0",
  },
  changeModeBtn: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Header() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const fullName = loggedInUser.fullName;
  const displayName = fullName?.split("")[0];
  const [anchorEl, setAnchorEl] = useState(null); // assign target to know where pop up menu
  const dispatch = useDispatch();
  const cartCounter = useSelector(cartListCountSlector);

  const handleLogout = () => {
    const action = logout();
    dispatch(action);
    setAnchorEl(null);
  };

  const history = useHistory();

  const handleIconClick = () => {
    history.push("/cart");
  };

  return (
    <Box>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Link to="/" className={`${classes.link} ${classes.logo}`}>
            <ShoppingBasketIcon />
            <Typography variant="h6" className={classes.title}>
              EZ-STORE
            </Typography>
          </Link>
          <Link to="/products" className={classes.link}>
            <Button color="inherit" className={classes.btn}>
              Let's Shop
            </Button>
          </Link>
          <IconButton
            onClick={handleIconClick}
            aria-label="show number item in cart"
            color="inherit"
          >
            <Badge badgeContent={cartCounter} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {!isLoggedIn ? (
            <Box>
              <Button
                onClick={() => {
                  setOpen(!open);
                  setMode("login");
                }}
                color="inherit"
                className={classes.btn}
              >
                Login
              </Button>
            </Box>
          ) : (
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar>{displayName}</Avatar>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogActions>
          <IconButton
            onClick={() => setOpen(false)}
            className={classes.closeBtn}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
        {mode === "login" ? (
          <Login handleClose={() => setOpen(false)} />
        ) : (
          <Register handleClose={() => setOpen(false)} />
        )}
        {mode === "login" ? (
          <Box textAlign="center">
            <Button
              color="inherit"
              type="submit"
              className={classes.changeModeBtn}
              onClick={() => setMode("register")}
            >
              not have an account. register here
            </Button>
          </Box>
        ) : (
          <Box textAlign="center">
            <Button
              color="inherit"
              type="submit"
              className={classes.changeModeBtn}
              onClick={() => setMode("login")}
            >
              Already have an account. Sign in here.
            </Button>
          </Box>
        )}
      </Dialog>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
