import { Container, Grid, makeStyles, Paper } from "@material-ui/core";
import { productApi } from "api/productApi";
import React, { useEffect, useState } from "react";
import ProductFilter from "../components/ProductFilter";
import ProductList from "../components/ProductList";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  left: {
    width: "250px",
  },
  right: {
    flexGrow: "1",
  },
}));
function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    _sort: "salePrice:ASC",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getAll(filters);
        setProductList(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item className={classes.left}>
          <Paper elevation={1}>
            <ProductFilter />
          </Paper>
        </Grid>
        <Grid item className={classes.right}>
          <Paper elevation={1}>
            <ProductList productList={productList} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ListPage;
