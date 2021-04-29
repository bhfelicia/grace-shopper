import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchProducts } from "../../store/thunks/productThunk";

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
          .filter((product) => product.status === "active")
          .map((product) => (
            <div key={`${product.id}`}>
              <Link to={`/products/${product.id}`}>
                <img src={product.image}></img>
              </Link>
              <h2>{product.name}</h2>
              {/* <p>{product.description}</p> */}
              {/* <p>Size: {product.size} </p> */}
              <h3>${product.price}</h3>
              {/* <p>{product.inventory} of these beauties in stock!</p> */}
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
