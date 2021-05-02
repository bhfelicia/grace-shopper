import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  destroyCategory,
  fetchCategory,
} from "../../store/thunks/categoryThunk";

class SingleCategory extends Component {
  componentDidMount() {
    this.props.getCategory(Number(this.props.match.params.id));
  }

  render() {
    const selectedCategory_products = this.props.categoryReducer
      .selectedCategory.products;
    if (selectedCategory_products) {
      return (
        <div>
          {selectedCategory_products.map((product) => (
            <div key={`${product.id}`}>
              <Link to={`/products/${product.id}`}>
                <img src={product.image}></img>
                <h2>{product.name}</h2>
                <h3>${product.price}</h3>
              </Link>
            </div>
          ))}
        </div>
      );
    } else {
      return <div>Is Loading....</div>;
    }
  }
}

const mapStateToProps = ({ categoryReducer }) => ({
  categoryReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getCategory: (id) => dispatch(fetchCategory(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleCategory);
