import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Home from '../NAVBAR/Home';

import { fetchProducts } from '../../store/thunks/productThunk';
import { addCart, addToCart, fetchCart } from '../../store/thunks/orderThunk';

import { motion } from 'framer-motion';
import Emoji from 'react-emoji-render';

import ImageSlider from '../SLIDES/ImageSlider';
import { SliderData } from '../SLIDES/SliderData';

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  async componentDidMount() {
    await this.props.getProducts();
    await this.props.getCart();
  }
  addToCart(productId) {
    const cartId = this.props.orderReducer.currentCart.id;
    if (!this.props.orderReducer.currentCart) {
      this.props.createCart(productId);
    } else {
      const productExistsInCart = this.props.orderReducer.currentCart.products.filter(
        (product) => product.id === productId
      ).length;
      if (productExistsInCart > 0) {
        //then the product exists, we must update the product quantity of the existing record in order_product
        this.props.amendCart(productId, cartId, true);
      } else {
        this.props.amendCart(productId, cartId, false);
      }
    }
    this.componentDidMount();
  }
  render() {
    const { products } = this.props.productReducer;
    const { addToCart } = this;
    return (
      <div>
        <motion.div
          id="all-products"
          transition={{ ease: 'easeOut', duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ x: [100, 0], opacity: 1 }}
        >
          <Home />
          <ImageSlider slides={SliderData} />
          {products
            .filter((product) => product.status === 'active')
            .map((product) => (
              <div key={`${product.id}`} className="singleProduct">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: [0.9, 1.05] }}
                >
                  <Link to={`/products/${product.id}`}>
                    <img src={product.image}></img>
                    <h2>{product.name}</h2>
                    <h3>${product.price}</h3>
                    <div></div>
                  </Link>
                </motion.div>
                <motion.button
                  className="cartButton"
                  onClick={() => addToCart(product.id)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: [0.9, 1.05] }}
                >
                  add to cart
                </motion.button>
              </div>
            ))}
        </motion.div>
        <motion.h1
          id="aboutLink"
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: [0.9, 1.05] }}
        >
          <Link to="/about">
            <Emoji text="&#128104;&#127995;&#8205;&#128187;&#128105;&#127998;&#8205;&#128187;&#128104;&#127995;&#8205;&#128187;&#128105;&#127995;&#8205;&#128187;" />
          </Link>
        </motion.h1>
      </div>
    );
  }
}

const mapStateToProps = ({ productReducer, userReducer, orderReducer }) => ({
  productReducer,
  userReducer,
  orderReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
  createCart: (id) => dispatch(addCart(id)),
  amendCart: (id, cartId, productExists) =>
    dispatch(addToCart(id, cartId, productExists)),
  getCart: () => dispatch(fetchCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
