import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import store from '../store/store';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/thunks/userThunk';
import Nav from './NAVBAR/Navbar'
import Home from './NAVBAR/Home'
import LoginForm from './FORMS/LoginForm';
import SignUpForm from './FORMS/SignUpForm';

class App extends Component {
  componentDidMount() {
    this.props.load();
  }

  render() {
    console.log(store.getState());
    return (
      <Router>
        <Route component={Nav} path='/' exact/> 
        <Route component={Home} path='/' exact/> 
        <Route component={LoginForm} path='/LoginPage' exact/> 
        <Route component={SignUpForm} path='/SignUpPage' exact/>
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
