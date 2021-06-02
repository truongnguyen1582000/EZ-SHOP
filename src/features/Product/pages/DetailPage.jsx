import {
  Box,
  Container,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import AddToCartForm from "../components/AddToCartForm";
import ProdductMenu from "../components/ProductMenu";
import ProductInfo from "../components/ProductInfo";
import ProductThumbnail from "../components/ProductThumbnail";
import useProductDetail from "../hooks/useProductDetail";
import ProductDesc from "../components/ProductDesc";
import ProductAdditional from "../components/ProductAdditional";
import ProductReview from "../components/ProductReview";

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
  const { url, params } = useRouteMatch();

  const { loading, product } = useProductDetail(params.productId);

  const handleAddToCartSubmit = () => {};

  console.log(product);

  if (loading) {
    return <LinearProgress />;
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
            <AddToCartForm onSubmit={handleAddToCartSubmit} />
          </Grid>
        </Grid>
      </Paper>
      <ProdductMenu />
      <Switch>
        <Route path={url} exact>
          <ProductDesc product={product} />
        </Route>
        <Route path={`${url}/additional`} exact>
          <ProductAdditional product={product} />
        </Route>
        <Route path={`${url}/reviews`} exact>
          <ProductReview product={product} />
        </Route>
      </Switch>
    </Container>
  );
}

export default DetailPage;
