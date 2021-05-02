import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchProducts } from "../../store/thunks/productThunk";
import { addCart } from "../../store/thunks/orderThunk";

class AllProducts extends Component {
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
  }
  componentDidMount() {
    this.props.getProducts();
  }
  addToCart(productId) {
    const { id } = this.props.userReducer.selectedUser;
    this.props.createCart(productId, id);
    //for now, this is just going to be to add to a cart to create a new order in progress
  }
  render() {
    const { products } = this.props.productReducer;
    const { addToCart } = this;
    return (
      <div id="all-products">
        {products
          .filter((product) => product.status === "active")
          .map((product) => (
            <div key={`${product.id}`}>
              <Link to={`/products/${product.id}`}>
                <img src={product.image}></img>
                <h2>{product.name}</h2>
                <h3>${product.price}</h3>
                <div>
                  <button onClick={() => addToCart(product.id)}>
                    Add To Cart
                  </button>
                </div>
              </Link>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = ({ productReducer, userReducer }) => ({
  productReducer,
  userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
  createCart: (id) => dispatch(addCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
