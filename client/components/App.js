import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import store from '../store/store';
import { connect } from 'react-redux';
import { fetchUser, fetchUsers } from '../store/thunks/userThunk';
import AllProducts from './PRODUCTS/AllProducts';
import SingleProduct from './PRODUCTS/SingleProduct';
import AllOrders from './ORDERS/AllOrders';
import SingleOrder from './ORDERS/SingleOrder';
import ProductReviews from './REVIEWS/ProductReviews';
import AllUsers from './USERS/AllUsers';
import SingleUser from './USERS/SingleUser';

import Login from './NAVBAR/Login';
import SignUp from './NAVBAR/SignUp';

class App extends Component {
  componentDidMount() {
    this.props.loadUsers();
    if (window.localStorage.getItem("userId")) {
      this.props.loadUser();
    }
  }

  render() {
    console.log(store.getState());
    console.log(window.localStorage);
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={AllProducts} />
            <Route
              exact
              path="/products/:id/reviews"
              component={ProductReviews}
            />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route exact path="/orders" component={AllOrders}></Route>
            <Route exact path="/orders/:id" component={SingleOrder}></Route>
            <Route exact path="/users" component={AllUsers}></Route>
            <Route exact path="/users/:id" component={SingleUser}></Route>
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
