import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { formatPrice } from "../utils";

const useStyles = makeStyles((theme) => ({
  root: {},
  name: {
    marginBottom: theme.spacing(1),
  },
  shortDesc: {
    marginBottom: theme.spacing(1),
  },
  price: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[300],
  },
  salePrice: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: "bold",
    marginRight: theme.spacing(3),
  },
  originalPrice: {
    textDecoration: "line-through",
    marginRight: theme.spacing(3),
  },
  promotionPercent: {},
}));

function ProductInfo({ product }) {
  const classes = useStyles();
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } =
    product;
  return (
    <Box className={classes.root}>
      <Typography className={classes.name} variant="h4" color="initial">
        {name}
      </Typography>
      <Typography
        className={classes.shortDesc}
        variant="inherit"
        color="initial"
      >
        {shortDescription}
      </Typography>
      <Box className={classes.price}>
        <Box className={classes.salePrice} component="span">
          {formatPrice(salePrice)}
        </Box>
        {promotionPercent > 0 ? (
          <>
            <Box className={classes.originalPrice} component="span">
              {formatPrice(originalPrice)}
            </Box>
            <Box className={classes.promotionPercent} component="span">
              {`-${promotionPercent}%`}
            </Box>
          </>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default ProductInfo;
