import React, { Component } from "react";
import { connect } from "react-redux";
import Checkout from "./Checkout";

import Emoji from "react-emoji-render";
import { motion } from "framer-motion";

import {
  fetchCart,
  fetchOrders,
  deleteFromCart,
  addOneToCart,
} from "../../store/thunks/orderThunk";

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
  render() {
    const currentCart = this.props.orderReducer.currentCart || [];
    if (!currentCart.products || !currentCart.products.length) {
      return (
        <motion.div
          transition={{ ease: "easeOut", duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ x: [100, 0], opacity: 1 }}
        >
          <h1>
            <Emoji text=":grimacing:" />
          </h1>
          <h2>your cart is empty!</h2>
        </motion.div>
      );
    } else if (!this.state.showCheckout) {
      return (
        <motion.div
          transition={{ ease: "easeOut", duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ x: [100, 0], opacity: 1 }}
        >
          <ol>
            {currentCart.products.map((product) => (
              <li key={product.id} id="individualCartItem">
                <img src={product.image}></img>
                <div id="cartButtons">
                  <button
                    id="incCart"
                    onClick={() =>
                      this.addProductToCart(product.id, currentCart.id)
                    }
                  >
                    +
                  </button>
                  {product.order_product.product_quantity}
                  <button
                    id="decCart"
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
                    -
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
                    delete
                  </button>
                </div>
              </li>
            ))}
          </ol>
          <hr />
          <h5>subtotal: ${currentCart.total}</h5>
          <h5>tax: ${currentCart.tax}</h5>
          <h3>grand total: ${Number(currentCart.total) + currentCart.tax}</h3>
          <button onClick={this.showCheckoutFunc}>checkout</button>
        </motion.div>
      );
    } else {
      return (
        <motion.div
          transition={{ ease: "easeOut", duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ x: [100, 0], opacity: 1 }}
        >
          <ol>
            {currentCart.products.map((product) => (
              <li key={product.id} id="individualCartItem">
                <img src={product.image}></img>
                <div id="cartButtons">
                  <button
                    id="incCart"
                    onClick={() =>
                      this.addProductToCart(product.id, currentCart.id)
                    }
                  >
                    +
                  </button>
                  {product.order_product.product_quantity}
                  <button
                    id="decCart"
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
                    -
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
                    delete
                  </button>
                </div>
              </li>
            ))}
          </ol>
          <hr />
          <h5>subtotal: ${currentCart.total}</h5>
          <h5>tax: ${currentCart.tax}</h5>
          <h3>grand total: ${Number(currentCart.total) + currentCart.tax}</h3>
          <Checkout cart={currentCart} />
        </motion.div>
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
