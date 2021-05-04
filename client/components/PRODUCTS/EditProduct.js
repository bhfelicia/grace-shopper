import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProduct, fetchProduct } from '../../store/thunks/productThunk';
import axios from 'axios';

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: +this.props.match.params.id || '',
      name: this.props.productReducer.singleProduct.name || '',
      description: this.props.productReducer.singleProduct.description || '',
      price: this.props.productReducer.singleProduct.price || 0,
      size: this.props.productReducer.singleProduct.size || '',
      image: this.props.productReducer.singleProduct.image || '',
      inventory: this.props.productReducer.singleProduct.inventory || 0,
      status: this.props.productReducer.singleProduct.status || '',
      loggedInUser: {
        fullName: '',
        id: 0,
        isAdmin: false,
        role: '',
        first: '',
        last: '',
        password: '',
        email: '',
        createdAt: '',
        updatedAt: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.editProductHandler = this.editProductHandler.bind(this);
  }
  async componentDidMount() {
    await this.props.getProduct(+this.props.match.params.id);
    const { data: loggedInUser } = await axios.get('/api/auth', {
      headers: { authorization: window.localStorage.getItem('token') },
    });
    const {
      id,
      name,
      description,
      price,
      size,
      image,
      inventory,
      status,
    } = this.props.productReducer.singleProduct;
    this.setState({
      id,
      name,
      description,
      price,
      size,
      image,
      inventory,
      status,
      loggedInUser,
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  editProductHandler(evt) {
    evt.preventDefault();
    const updatedProduct = { ...this.state };
    this.props.editProduct(updatedProduct);
  }
  render() {
    const { singleProduct } = this.props.productReducer;
    const { selectedUser } = this.props.userReducer;
    const style = {
      width: 600,
    };
    if (!this.state.loggedInUser.isAdmin) {
      return (
        <div>
          <img
            src="https://media3.giphy.com/media/8abAbOrQ9rvLG/200.gif"
            style={style}
          />
        </div>
      );
    } else {
      return (
        <div>
          <form onSubmit={this.editProductHandler}>
            <h4>Edit Product</h4>
            <label>Name</label>
            <input
              type="text"
              value={this.state.name}
              name="name"
              required
              onChange={this.handleChange}
            />
            <label>Description</label>
            <input
              type="text"
              value={this.state.description}
              name="description"
              required
              onChange={this.handleChange}
            />
            <label>Price</label>
            <input
              type="text"
              value={this.state.price}
              name="price"
              required
              onChange={this.handleChange}
            />
            <label>Size</label>
            <input
              type="text"
              value={this.state.size}
              name="size"
              required
              onChange={this.handleChange}
            />
            <label>Image</label>
            <input
              type="text"
              value={this.state.image}
              name="image"
              required
              onChange={this.handleChange}
            />
            <label>Inventory</label>
            <input
              type="text"
              value={this.state.inventory}
              name="inventory"
              required
              onChange={this.handleChange}
            />
            <label>Status</label>
            <input
              type="text"
              value={this.state.status}
              name="status"
              required
              onChange={this.handleChange}
            />
            <button type="submit">Edit this product</button>
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

const mapDispatchToProps = (dispatch, { history }) => ({
  getProduct: (productId) => dispatch(fetchProduct(productId)),
  editProduct: (product) => dispatch(updateProduct(product, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
