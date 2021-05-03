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
    this.handleChange = this.handleChange.bind(this);
    this.createProductHandler = this.createProductHandler.bind(this);
  }
  createProductHandler(ev) {
    ev.preventDefault();
    const newProduct = { ...this.state };
    this.props.createProduct(newProduct);
  }
  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render() {
    const { selectedUser } = this.props.userReducer;
    const style = {
      width: 600,
    };
    if (!selectedUser.isAdmin) {
      return (
        <div>
          <img
            src="https://media3.giphy.com/media/8abAbOrQ9rvLG/200.gif"
            style={style}
          />
        </div>
      );
    } else {
      const sizes = ["--", "small", "medium", "large"];
      const statuses = ["active", "not active"];
      return (
        <div>
          <form onSubmit={this.createProductHandler}>
            <h4>Add a Product</h4>
            <label>Name</label>
            <input
              type="text"
              value={this.state.name}
              name="name"
              onChange={this.handleChange}
              required
            ></input>
            <br></br>
            <label>Description</label>
            <input
              type="text"
              value={this.state.description}
              name="description"
              onChange={this.handleChange}
            ></input>
            <br></br>
            <label>Price</label>
            <input
              type="number"
              value={this.state.price}
              name="price"
              onChange={this.handleChange}
            ></input>
            <br></br>
            <label>Size</label>
            <select name="size" onChange={this.handleChange}>
              {sizes.map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
            <br></br>
            <label>Image</label>
            <input
              type="text"
              value={this.state.image}
              name="image"
              onChange={this.handleChange}
            ></input>
            <br></br>
            <label>Inventory</label>
            <input
              type="number"
              value={this.state.inventory}
              name="inventory"
              onChange={this.handleChange}
            ></input>
            <br></br>
            <label>Status</label>
            <select name="status" onChange={this.handleChange}>
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <br></br>
            <button type="submit">Add this product</button>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ productReducer, userReducer }) => ({
  productReducer,
  userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  createProduct: (product) => dispatch(addProduct(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
