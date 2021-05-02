import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchProducts } from '../../store/thunks/productThunk';
import { addCart } from '../../store/thunks/orderThunk';

class AllProducts extends Component {
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
  }
  componentDidMount() {
    this.props.getProducts();
  }
  addToCart(productId) {
    //const { id } = this.props.userReducer.selectedUser;
    if (!this.props.orderReducer.currentCart) {
      this.props.createCart(productId, this.props.userReducer.selectedUser.id);
    } else {
      //update cart
    }
    //for now, this is just going to be to add to a cart to create a new order in progress
  }
  render() {
    const { products } = this.props.productReducer;
    const { addToCart } = this;
    return (
      <div id="all-products">
        {products
          .filter((product) => product.status === 'active')
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

const mapStateToProps = ({ productReducer, userReducer, orderReducer }) => ({
  productReducer,
  userReducer,
  orderReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
  createCart: (id, userId) => dispatch(addCart(id, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
