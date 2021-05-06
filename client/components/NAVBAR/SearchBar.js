import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts, filterProducts } from "../../store/thunks/productThunk";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
    };
    this.searchInputHandler = this.searchInputHandler.bind(this);
  }

  async searchInputHandler(event) {
    const value = event.target.value;
    const { getFilteredProducts } = this.props;
    await getFilteredProducts(value);
    if (value === "") {
      await this.props.getProducts();
    }
  }

  render() {
    return (
      <div>
        {/* <label>Search </label> */}
        <input
          type="search"
          placeholder="search for item"
          name="item"
          // value={this.state.item}
          onChange={this.searchInputHandler}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ productReducer }) => ({ productReducer });

const mapDispatchToProps = (dispatch) => {
  return {
    getFilteredProducts: (productName) => dispatch(filterProducts(productName)),
    getProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
