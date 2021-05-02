import React, { Component } from "react";
import { connect } from "react-redux";

import { addProduct } from "../../store/thunks/productThunk";

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: 0,
      size: "",
      image: "",
      inventory: 0,
      status: "",
    };
  }

  render() {
    return <div>HEYYYYY</div>;
  }
}

const mapStateToProps = ({ productReducer }) => ({
  productReducer,
});

const mapDispatchToProps = (dispatch) => ({
  createProduct: (product) => dispatch(addProduct(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
