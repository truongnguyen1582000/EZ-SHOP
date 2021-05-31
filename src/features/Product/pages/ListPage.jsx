import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { productApi } from "api/productApi";
import queryString from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router";
import FilterViewer from "../components/FilterViewer";
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

  const location = useLocation();
  const history = useHistory();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _limit: parseInt(params._limit) || 12,
      _page: parseInt(params._page) || 1,
      _sort: params._sort || "salePrice:ASC",
      isPromotion: params.isPromotion === "true",
      isFreeShip: params.isFreeShip === "true",
    };
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        console.log(data);
        setPagination(pagination);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, [queryParams]);

  const handlePaginationChange = (e, newPage) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify({
        ...queryParams,
        _page: newPage,
      }),
    });
  };

  const handleSortChange = (newVal) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify({
        ...queryParams,
        _sort: newVal,
      }),
    });
  };

  const handleFiltersChange = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify({
        ...queryParams,
        ...newFilters,
      }),
    });
  };

  const handleFWChange = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify({
        ...newFilters,
      }),
    });
  };

  return (
    <Container className={classes.root}>
      <Grid container spacing={1}>
        <Grid item className={classes.left}>
          <Paper elevation={1}>
            <Box padding={1}>
              <ProductFilter
                filters={queryParams}
                onChange={handleFiltersChange}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item className={classes.right}>
          <Paper elevation={1}>
            <ProductSort
              value={queryParams._sort}
              onChange={handleSortChange}
            />
            <FilterViewer filters={queryParams} onChange={handleFWChange} />
            {isLoading ? (
              <ProductSkeletonList length={queryParams._limit} />
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
