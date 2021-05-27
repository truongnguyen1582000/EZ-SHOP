import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import DetailPage from "./pages/DetailPage";
import ListPage from "./pages/ListPage";

function ProductFeature(props) {
  const { enqueueSnackbar } = useSnackbar();
  const match = useRouteMatch();

  useEffect(() => {
    enqueueSnackbar("Wellcome to EZ-STORE ~ . ~ let's shop now !!!", {
      variant: "info",
    });
  }, []);

  return (
    <div>
      <Switch>
        <Route path={match.url} exact component={ListPage} />
        <Route path={`${match.url}/:productId`} component={DetailPage} />
      </Switch>
    </div>
  );
}

export default ProductFeature;
