import { Route, Switch } from "react-router";
import "./App.css";
import Header from "./components/Header";
import Home from "./features/Home";
import ProductFeature from "./features/Product";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/products" component={ProductFeature} />
      </Switch>
    </div>
  );
}

export default App;
