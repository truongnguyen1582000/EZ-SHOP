import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: theme.spacing(2, 4),
  },
  link: {
    color: "grey",
    fontWeight: "bold",
    fontSize: theme.typography.body1.fontSize,
    textDecoration: "none",
    userSelect: "none",

    "&.active": {
      textDecoration: "underline",
      textUnderlineOffset: "8px",
      textDecorationThickness: "4px",
      color: "#e28743",
    },
  },
}));

function ProdductMenu(props) {
  const classes = useStyles();
  const { url } = useRouteMatch();
  return (
    <Box component="ul" className={classes.root}>
      <li className={classes.item}>
        <NavLink className={classes.link} to={url} exact>
          Description
        </NavLink>
      </li>
      <li className={classes.item}>
        <NavLink className={classes.link} to={`${url}/additional`} exact>
          Additional Infomation
        </NavLink>
      </li>
      <li className={classes.item}>
        <NavLink className={classes.link} to={`${url}/reviews`} exact>
          Reviews
        </NavLink>
      </li>
    </Box>
  );
}

export default ProdductMenu;
