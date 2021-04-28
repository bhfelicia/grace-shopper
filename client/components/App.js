import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import store from "../store/store";
class App extends Component {
  render() {
    console.log(store.getState());
    return (
      <div>
        <h1>Is this working?</h1>
        <Router></Router>
      </div>
    );
  }
}

export default App;
