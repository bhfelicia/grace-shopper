import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCart, fetchOrders } from '../../store/thunks/orderThunk';

let theCart;

class Cart extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   currentCart: {},
    // };
  }

  componentDidMount() {
    this.props.getOrders();
    this.props.getCart(Number(window.localStorage.userId));
  }

  render() {
    const currentCart = this.props.orderReducer.currentCart || [];
    if (!currentCart.products) return <div>Your cart is empty!</div>;
    else
      return (
        <div>
          <ol>
            {currentCart.products.map((product) => (
              <li key={product.id}>
                <img src={product.image}></img>
                <hr />
                {product.order_product.product_quantity} x {product.name} - $
                {product.price * product.order_product.product_quantity}
              </li>
            ))}
          </ol>
          <hr />
          <h5>Subtotal: ${currentCart.total}.00</h5>
          <h5>Tax: ${currentCart.tax}0</h5>
          <h3>Grand total: ${Number(currentCart.total) + currentCart.tax}0</h3>
        </div>
      );
    // console.log(currentCart.products);
    // if (!currentCart) return null;
    // return null;
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
