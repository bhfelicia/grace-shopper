import React, { Component } from "react";
import { connect } from "react-redux";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}></form>
      </div>
    );
  }
}

export default Checkout;
