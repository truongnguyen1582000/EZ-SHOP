import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { useRouteMatch } from "react-router";
import ProductInfo from "../components/ProductInfo";
import ProductThumbnail from "../components/ProductThumbnail";
import useProductDetail from "../hooks/useProductDetail";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  left: {
    width: "400px",
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: "1 1 0",
    padding: theme.spacing(1.5),
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    padding: `${theme.spacing(1)}px 0`,
  },
}));

function DetailPage() {
  const classes = useStyles();
  const match = useRouteMatch();

  const { loading, product } = useProductDetail(match.params.productId);

  if (loading) {
    return <Box>Loading</Box>;
  }

  return (
    <Container className={classes.root}>
      <Paper elevation={0}>
        <Grid container>
          <Grid item className={classes.left}>
            <ProductThumbnail product={product} />
          </Grid>
          <Grid item className={classes.right}>
            <ProductInfo product={product} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default DetailPage;
