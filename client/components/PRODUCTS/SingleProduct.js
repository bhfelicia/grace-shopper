import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProduct } from '../../store/thunks/productThunk';
import ProductReviews from '../REVIEWS/ProductReviews';
import CreateReview from '../REVIEWS/CreateReview';
import { addCart, addToCart, fetchCart } from '../../store/thunks/orderThunk';

import { motion } from 'framer-motion';
import Emoji from 'react-emoji-render';

class SingleProduct extends Component {
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
  }
  componentDidMount() {
    this.props.getProduct(Number(this.props.match.params.id));
    this.props.getCart();
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
    const { singleProduct } = this.props.productReducer;
    return (
      <motion.div
        id="single-product"
        transition={{ ease: 'easeOut', duration: 1 }}
        initial={{ opacity: 0 }}
        animate={{ x: [100, 0], opacity: 1 }}
      >
        <div>
          <h1>{singleProduct.name}</h1>
          <img id="singleProductImageView" src={singleProduct.image}></img>
          <p>{singleProduct.description}</p>
          <h2>${singleProduct.price}</h2>
          <p>size: {singleProduct.size} </p>
          <p>{singleProduct.inventory} of these beauties in stock!</p>
          <button onClick={() => this.addToCart(singleProduct.id)}>
            add to cart
          </button>
          <br />
          <Link to={`/products/${singleProduct.id}/edit`}>
            <button>edit product details</button>
          </Link>
        </div>

        <div>
          <ProductReviews productId={singleProduct.id} />
        </div>
        <div>
          <CreateReview productId={singleProduct.id} />
        </div>
      </motion.div>
    );
  }
}

const mapStateToProps = ({ productReducer, orderReducer }) => ({
  productReducer,
  orderReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getProduct: (id) => dispatch(fetchProduct(id)),
  createCart: (id) => dispatch(addCart(id)),
  amendCart: (id, cartId, productExists) =>
    dispatch(addToCart(id, cartId, productExists)),
  getCart: () => dispatch(fetchCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
