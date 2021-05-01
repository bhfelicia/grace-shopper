import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchProducts } from '../../store/thunks/productThunk';

class AllProducts extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const { products } = this.props.productReducer;
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
                  <button>Add To Cart</button>
                </div>
              </Link>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = ({ productReducer }) => ({
  productReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
