import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { motion } from 'framer-motion';

import {
  destroyCategory,
  fetchCategory,
} from '../../store/thunks/categoryThunk';

import { addCart, addToCart, fetchCart } from '../../store/thunks/orderThunk';

class SingleCategory extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }
  async componentDidMount() {
    await this.props.getCategory(Number(this.props.match.params.id));
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
    const { addToCart } = this;
    const selectedCategory_products = this.props.categoryReducer
      .selectedCategory.products;
    if (selectedCategory_products) {
      return (
        <motion.div
          id="singleCategoryView"
          transition={{ ease: 'easeOut', duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ x: [100, 0], opacity: 1 }}
        >
          {selectedCategory_products.map((product) => (
            <div className="singleProductCategoryView" key={`${product.id}`}>
              <Link to={`/products/${product.id}`}>
                <img src={product.image}></img>
                <h2>{product.name}</h2>
                <h3>${product.price}</h3>
              </Link>
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
      );
    } else {
      return <div>Is Loading....</div>;
    }
  }
}

const mapStateToProps = ({ categoryReducer, orderReducer, userReducer }) => ({
  categoryReducer,
  orderReducer,
  userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getCategory: (id) => dispatch(fetchCategory(id)),
  getCart: () => dispatch(fetchCart()),
  createCart: (id) => dispatch(addCart(id)),
  amendCart: (id, cartId, productExists) =>
    dispatch(addToCart(id, cartId, productExists)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleCategory);
