import { Box, makeStyles, Typography } from "@material-ui/core";
import { PLACEHOLDER_IMG, STATIC_HOST } from "constant";
import React from "react";
import { useHistory } from "react-router";
import { formatPrice } from "../utils";

const useStyles = makeStyles((theme) => ({
  product: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

function Product({ product }) {
  const classes = useStyles();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : `${PLACEHOLDER_IMG}`;

  const history = useHistory();

  const handleProductClick = (productId) => {
    history.push({
      pathname: `${history.location.pathname}/${productId}`,
    });
    console.log(product);
  };

  return (
    <Box
      padding={1}
      className={classes.product}
      onClick={() => handleProductClick(product.id)}
    >
      <Box>
        <img src={thumbnailUrl} width="100%" alt="" />
      </Box>
      <Typography variant="subtitle2">{product.name}</Typography>
      <Typography variant="body2">
        {formatPrice(product.originalPrice)}
        {product.promotionPercent > 0 ? `-${product.promotionPercent}%` : ""}
      </Typography>
      <Typography variant="body2"></Typography>
    </Box>
  );
}

export default Product;
