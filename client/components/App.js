import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import store from "../store/store";
import { connect } from "react-redux";
import { fetchUser, fetchUsers } from "../store/thunks/userThunk";
import AllProducts from "./PRODUCTS/AllProducts";
import SingleProduct from "./PRODUCTS/SingleProduct";
import AllOrders from "./ORDERS/AllOrders";
import SingleOrder from "./ORDERS/SingleOrder";
import EditOrder from "./ORDERS/EditOrder";
import ProductReviews from "./REVIEWS/ProductReviews";
import AllUsers from "./USERS/AllUsers";
import SingleUser from "./USERS/SingleUser";
import EditUser from "./USERS/EditUser";
import CreateUser from "./USERS/CreateUser";
import Cart from "./CART/Cart";

import Login from "./NAVBAR/Login";
import SignUp from "./NAVBAR/SignUp";
import Navbar from "./NAVBAR/Navbar";
import Header from "./HEADER/Header";
import AllCategories from "./CATEGORIES/AllCategories";
import SingleCategory from "./CATEGORIES/SingleCategory";
import CreateCategory from "./CATEGORIES/CreateCategory";
import EditCategory from "./CATEGORIES/EditCategory";

class App extends Component {
  componentDidMount() {
    this.props.loadUsers();
    this.props.loadUser();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.userReducer.selectedUser !== this.props.userReducer.selectedUser
    ) {
      this.render();
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Header />
          <Switch>
            <Route exact path="/" component={AllProducts} />
            <Route exact path="/categories" component={AllCategories} />
            <Route
              exact
              path="/products/:id/reviews"
              component={ProductReviews}
            />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route exact path="/categories/:id" component={SingleCategory} />
            <Route exact path="/createCategory" component={CreateCategory} />
            <Route exact path="/categories/:id/edit" component={EditCategory} />
            <Route exact path="/orders" component={AllOrders}></Route>
            <Route exact path="/orders/:id" component={SingleOrder}></Route>
            <Route exact path="/orders/:id/edit" component={EditOrder}></Route>
            <Route exact path="/users" component={AllUsers}></Route>
            <Route exact path="/users/:id" component={SingleUser}></Route>
            <Route exact path="/users/:id/edit" component={EditUser}></Route>
            <Route exact path="/signup/create" component={CreateUser}></Route>
            <Route exact path="/cart" component={Cart}></Route>
            {/* <Route exact path="/users/:id/edit" component={EditUser}></Route> Most likely don't need this if I am going to include the edit user form on a single user view regardless!*/}
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
    loadUsers: async () => {
      dispatch(fetchUsers());
    },
    loadUser: async () => {
      dispatch(fetchUser(Number(window.localStorage.userId)));
    },
  };
};
export default connect(mapState, mapDispatch)(App);
