import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts, filterProducts } from "../../store/thunks/productThunk";

// // onclick()
// const searchBar = ()=>{
//     return(

//         <div className="search-container">
//             {/* <i className="fa fa-search searchIcon"></i> */}
//             <input className="searchBox" type="search" name="search" placeholder="Search by category"/>
//             <button type ="submit" value="search" className="searchButton" onClick={()=> console.log('Clicked the searchbox')}>enter</button>
//         </div>
//     );
// }

// export default connect(state => state)(searchBar);

class SearchBar extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   item: "",
    // };
    this.searchInputHandler = this.searchInputHandler.bind(this);
    // this.searchSubmitHandler = this.searchSubmitHandler.bind(this);
  }

  async searchInputHandler(event) {
    const value = event.target.value;
    console.log(value);
    const { getFilteredProducts } = this.props;
    await getFilteredProducts(value);
    if (value === "") {
      await this.props.getProducts();
    }
  }

  render() {
    return (
      <div>
        <label>Search </label>
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
