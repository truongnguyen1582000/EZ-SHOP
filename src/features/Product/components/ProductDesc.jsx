import { Paper } from "@material-ui/core";
import React from "react";
import DOMPurify from "dompurify";

function ProductDesc({ product }) {
  const cleanedHtml = DOMPurify.sanitize(product.description);
  return (
    <Paper elevation={1} style={{ padding: "15px" }}>
      <div dangerouslySetInnerHTML={{ __html: cleanedHtml }}></div>
    </Paper>
  );
}

export default ProductDesc;
