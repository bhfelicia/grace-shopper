import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import store from '../store/store';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/thunks/userThunk';
import AllProducts from './PRODUCTS/AllProducts';
import Login from './NAVBAR/Login';

class App extends Component {
  componentDidMount() {
    this.props.load();
  }

  render() {
    console.log(store.getState());
    return (
      <Router>
        <div>
          <Route path="/" component={AllProducts} exact />
          <Route path="/login" component={Login} exact />
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
