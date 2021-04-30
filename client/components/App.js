import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import store from '../store/store';
import { connect } from 'react-redux';
import { fetchUser, fetchUsers } from '../store/thunks/userThunk';
import AllProducts from './PRODUCTS/AllProducts';
import SingleProduct from './PRODUCTS/SingleProduct';
import AllOrders from './ORDERS/AllOrders';
import SingleOrder from './ORDERS/SingleOrder';

import Login from './NAVBAR/Login';

class App extends Component {
  componentDidMount() {
    this.props.loadUsers();
    this.props.loadUser();
  }

  render() {
    console.log(store.getState());
    console.log(window.localStorage);
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={AllProducts} exact />
            <Route exact path="/products" component={AllProducts} exact />
            <Route exact path="/login" component={Login} exact />
            <Route exact path="/products/:id" component={SingleProduct}></Route>
            <Route exact path="/orders" component={AllOrders}></Route>
            <Route exact path="/orders/:id" component={SingleOrder}></Route>
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
      console.log(JSON.parse(window.localStorage.user), 'HERE!!!!');
      dispatch(fetchUser(Number(window.localStorage.userId)));
    },
  };
};
export default connect(mapState, mapDispatch)(App);
