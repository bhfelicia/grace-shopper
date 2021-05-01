import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchCart, fetchOrders } from "../store/thunks/orderThunk";

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getOrders();
    this.props.getCart(window.localStorage.userId);
  }

  render() {
    const { currentCart } = this.props.orderReducer;
    console.log(currentCart.products);
    // if (!currentCart) return null;
    return null;
    // <div id="cart">
    //   {currentCart.products.map((product) => (
    //     <div>{product.name}</div>
    //   ))}
    // </div>
  }
}

const mapStateToProps = ({ orderReducer }) => ({ orderReducer });

const mapDispatchToProps = (dispatch) => ({
  getCart: (id) => dispatch(fetchCart(id)),
  getOrders: () => dispatch(fetchOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
