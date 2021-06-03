import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import CartPage from "./pages/CartPage";

function CartFeature(props) {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route to={url} component={CartPage} />
    </Switch>
  );
}

export default CartFeature;
