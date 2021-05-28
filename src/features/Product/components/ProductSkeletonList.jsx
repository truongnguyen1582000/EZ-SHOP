import { Box, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

function ProductSkeletonList({ length }) {
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Box padding={1}>
              <Skeleton variant="rect" width="100%" height={240} />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductSkeletonList;
