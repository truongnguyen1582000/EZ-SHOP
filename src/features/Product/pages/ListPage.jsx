import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { productApi } from "api/productApi";
import React, { useEffect, useState } from "react";
import ProductFilter from "../components/ProductFilter";
import ProductList from "../components/ProductList";
import ProductSkeletonList from "../components/ProductSkeletonList";
import ProductSort from "../components/ProductSort";
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
  pagination: {
    display: "flex",
    justifyContent: "center",
    padding: `${theme.spacing(1)}px 0`,
  },
}));
function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 1,
    total: 1,
  });
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
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, [filters]);

  const handlePaginationChange = (e, newPage) => {
    setFilters({
      ...filters,
      _page: newPage,
    });
  };

  const handleSortChange = (newVal) => {
    setFilters({
      ...filters,
      _sort: newVal,
    });
  };

  const handleFiltersChange = (newFilters) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  return (
    <Container className={classes.root}>
      <Grid container spacing={1}>
        <Grid item className={classes.left}>
          <Paper elevation={1}>
            <Box padding={1}>
              <ProductFilter filters={filters} onChange={handleFiltersChange} />
            </Box>
          </Paper>
        </Grid>
        <Grid item className={classes.right}>
          <Paper elevation={1}>
            <ProductSort value={filters._sort} onChange={handleSortChange} />
            {isLoading ? (
              <ProductSkeletonList length={filters._limit} />
            ) : (
              <ProductList productList={productList} />
            )}
            <Pagination
              className={classes.pagination}
              count={Math.ceil(pagination.total / pagination.limit)}
              page={pagination.page}
              onChange={handlePaginationChange}
              color="primary"
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ListPage;
