import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProduct } from "../../store/thunks/productThunk";
import ProductReviews from "../REVIEWS/ProductReviews";
import CreateReview from "../REVIEWS/CreateReview";
import { addCart, addToCart, fetchCart } from "../../store/thunks/orderThunk";

import { motion } from "framer-motion";
import Emoji from "react-emoji-render";

import axios from "axios";

class SingleProduct extends Component {
  constructor() {
    super();
    this.state = {
      loggedInUser: {
        fullName: "",
        id: 0,
        isAdmin: false,
        role: "",
        first: "",
        last: "",
        password: "",
        email: "",
        createdAt: "",
        updatedAt: "",
      },
    };
    this.addToCart = this.addToCart.bind(this);
  }
  async componentDidMount() {
    this.props.getProduct(Number(this.props.match.params.id));
    this.props.getCart();
    const { data: loggedInUser } = await axios.get("/api/auth", {
      headers: { authorization: window.localStorage.getItem("token") },
    });
    this.setState({ loggedInUser });
  }
  addToCart(productId) {
    const cartId = this.props.orderReducer.currentCart.id;
    if (!this.props.orderReducer.currentCart) {
      this.props.createCart(productId);
    } else {
      const productExistsInCart =
        this.props.orderReducer.currentCart.products.filter(
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
        transition={{ ease: "easeOut", duration: 1 }}
        initial={{ opacity: 0 }}
        animate={{ x: [100, 0], opacity: 1 }}
      >
        <div>
          <img id="singleProductImageView" src={singleProduct.image}></img>

          <br />
          {this.state.loggedInUser.isAdmin ? (
            <Link to={`/products/${singleProduct.id}/edit`}>
              <button>edit</button>
            </Link>
          ) : (
            <div></div>
          )}
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
