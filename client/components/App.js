import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import store from "../store/store";
import { connect } from "react-redux";
import { fetchUsers } from "../store/thunks/userThunk";
import AllProducts from "./PRODUCTS/AllProducts";
import SingleProduct from "./PRODUCTS/SingleProduct";
import Login from "./NAVBAR/Login";

class App extends Component {
  componentDidMount() {
    this.props.load();
  }

  render() {
    console.log(store.getState());
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={AllProducts} exact />
            <Route exact path="/login" component={Login} exact />
            <Route exact path="/products/:id" component={SingleProduct}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
const mapState = (state) => {
  return state;
};

const mapDispatch = (dispatch) => {
  return {
    load: async () => {
      dispatch(fetchUsers());
    },
  };
};
export default connect(mapState, mapDispatch)(App);
