import { Box, Typography } from "@material-ui/core";
import { PLACEHOLDER_IMG, STATIC_HOST } from "constant";
import React from "react";

const formatPrice = (number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

function Product({ product }) {
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : `${PLACEHOLDER_IMG}`;

  return (
    <Box padding={1}>
      <Box>
        <img src={thumbnailUrl} width="100%" alt="" />
      </Box>
      <Typography variant="subtitle2">{product.name}</Typography>
      <Typography variant="body2">
        {formatPrice(product.originalPrice)}{" "}
        {product.promotionPercent > 0 ? `-${product.promotionPercent}%` : ""}
      </Typography>
      <Typography variant="body2"></Typography>
    </Box>
  );
}

export default Product;
