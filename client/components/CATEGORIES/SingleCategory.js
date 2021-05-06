import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { motion } from 'framer-motion';

import {
  destroyCategory,
  fetchCategory,
} from '../../store/thunks/categoryThunk';

class SingleCategory extends Component {
  componentDidMount() {
    this.props.getCategory(Number(this.props.match.params.id));
  }

  render() {
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
            </div>
          ))}
        </motion.div>
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
