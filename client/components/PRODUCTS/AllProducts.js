import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchProducts } from '../../store/thunks/productThunk';
import { addCart, addToCart, fetchCart } from '../../store/thunks/orderThunk';

class AllProducts extends Component {
  constructor() {
    super();
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
      <div id="all-products">
        {products
          .filter((product) => product.status === 'active')
          .map((product) => (
            <div key={`${product.id}`}>
              <Link to={`/products/${product.id}`}>
                <img src={product.image}></img>
                <h2>{product.name}</h2>
                <h3>${product.price}</h3>
                <div></div>
              </Link>
              <button onClick={() => addToCart(product.id)}>Add To Cart</button>
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
  createCart: (id) => dispatch(addCart(id)),
  amendCart: (id, cartId, productExists) =>
    dispatch(addToCart(id, cartId, productExists)),
  getCart: () => dispatch(fetchCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
