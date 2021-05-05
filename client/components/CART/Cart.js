import React, { Component } from 'react';
import { connect } from 'react-redux';
import Checkout from './Checkout';

import {
  fetchCart,
  fetchOrders,
  deleteFromCart,
  addOneToCart,
} from '../../store/thunks/orderThunk';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false,
    };
    this.showCheckoutFunc = this.showCheckoutFunc.bind(this);
    this.deleteProductFromCart = this.deleteProductFromCart.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
  }
  componentDidMount() {
    this.props.getOrders();
    this.props.getCart();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.showCheckout !== this.state.showCheckout) {
      this.render();
    }
  }
  async deleteProductFromCart(singleItem, productId, orderId) {
    await this.props.removeFromCart(singleItem, productId, orderId);
  }
  async addProductToCart(productId, orderId) {
    await this.props.incInCart(productId, orderId);
  }
  showCheckoutFunc() {
    this.setState({ ...this.state, showCheckout: !this.state.showCheckout });
  }
  async handleToken(token, address) {}
  render() {
    console.log(this.state);
    const currentCart = this.props.orderReducer.currentCart || [];
    if (!currentCart.products || !currentCart.products.length) {
      return <div>Your cart is empty!</div>;
    } else if (!this.state.showCheckout) {
      return (
        <div>
          <ol>
            {currentCart.products.map((product) => (
              <li key={product.id}>
                <img src={product.image}></img>
                <hr />
                <button>+</button>
                {product.order_product.product_quantity}
                <button
                  onClick={() => {
                    if (product.order_product.product_quantity != 1) {
                      this.deleteProductFromCart(
                        true,
                        product.id,
                        currentCart.id
                      );
                    } else {
                      this.deleteProductFromCart(
                        false,
                        product.id,
                        currentCart.id
                      );
                    }
                  }}
                >
                  --
                </button>
                x {product.name} - $
                {product.price * product.order_product.product_quantity}
                <button
                  onClick={() =>
                    this.deleteProductFromCart(
                      false,
                      product.id,
                      currentCart.id
                    )
                  }
                >
                  Delete
                </button>
              </li>
            ))}
          </ol>
          <hr />
          <h5>Subtotal: ${currentCart.total}</h5>
          <h5>Tax: ${currentCart.tax}</h5>
          <h3>Grand total: ${Number(currentCart.total) + currentCart.tax}</h3>
          <button onClick={this.showCheckoutFunc}>Proceed to checkout</button>
        </div>
      );
    } else {
      return (
        <div>
          <ol>
            {currentCart.products.map((product) => (
              <li key={product.id}>
                <img src={product.image}></img>
                <hr />
                <button>+</button>
                {product.order_product.product_quantity}
                <button
                  onClick={() => {
                    if (product.order_product.product_quantity != 1) {
                      this.deleteProductFromCart(
                        true,
                        product.id,
                        currentCart.id
                      );
                    } else {
                      this.deleteProductFromCart(
                        false,
                        product.id,
                        currentCart.id
                      );
                    }
                  }}
                >
                  --
                </button>
                x {product.name} - $
                {product.price * product.order_product.product_quantity}
                <button
                  onClick={() =>
                    this.deleteProductFromCart(
                      false,
                      product.id,
                      currentCart.id
                    )
                  }
                >
                  Delete
                </button>
              </li>
            ))}
          </ol>
          <hr />
          <h5>Subtotal: ${currentCart.total}</h5>
          <h5>Tax: ${currentCart.tax}</h5>
          <h3>Grand total: ${Number(currentCart.total) + currentCart.tax}</h3>
          <Checkout cart={currentCart} />
        </div>
      );
    }
  }
}

const mapStateToProps = ({ orderReducer }) => ({ orderReducer });

const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(fetchCart()),
  getOrders: () => dispatch(fetchOrders()),
  removeFromCart: (singleItem, productId, orderId) =>
    dispatch(deleteFromCart(singleItem, productId, orderId)),
  incInCart: (productId, orderId) => dispatch(addOneToCart(productId, orderId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
