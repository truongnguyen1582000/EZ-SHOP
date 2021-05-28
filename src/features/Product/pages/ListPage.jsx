import { Container, Grid, makeStyles, Paper } from "@material-ui/core";
import { productApi } from "api/productApi";
import React, { useEffect, useState } from "react";
import ProductFilter from "../components/ProductFilter";
import ProductList from "../components/ProductList";
import ProductSkeletonList from "../components/ProductSkeletonList";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  left: {
    width: "250px",
  },
  right: {
    flex: "1 1 0",
  },
}));
function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    _limit: 12,
    _page: 1,
    _sort: "salePrice:ASC",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        setProductList(data);
        setPagination(pagination);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, [filters]);

  return (
    <Container className={classes.root}>
      <Grid container spacing={1}>
        <Grid item className={classes.left}>
          <Paper elevation={1}>
            <ProductFilter />
          </Paper>
        </Grid>
        <Grid item className={classes.right}>
          <Paper elevation={1}>
            {isLoading ? (
              <ProductSkeletonList length={filters._limit} />
            ) : (
              <ProductList productList={productList} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ListPage;
