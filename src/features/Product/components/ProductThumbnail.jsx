import { Box } from "@material-ui/core";
import { PLACEHOLDER_IMG, STATIC_HOST } from "constant";
import React from "react";

function ProductThumbnail({ product }) {
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : PLACEHOLDER_IMG;
  return (
    <Box>
      <img src={thumbnailUrl} alt={product.name} width="100%" />{" "}
    </Box>
  );
}

export default ProductThumbnail;
