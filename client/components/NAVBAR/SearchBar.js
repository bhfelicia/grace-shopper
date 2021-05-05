import React, { Component } from "react";
import { connect } from "react-redux";

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
    this.state = {
      item: "",
    };
    this.searchInputHandler = this.searchInputHandler.bind(this);
    this.searchSubmitHandler = this.searchSubmitHandler.bind(this);
  }

  searchInputHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  //make action filtered product
  //will filter the current products in the state with just the one we are looking for
  //
  searchSubmitHandler(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.searchSubmitHandler}>
          <label>Search </label>
          <input
            type="search"
            placeholder="search for item"
            name="item"
            value={this.state.item}
            onChange={this.searchInputHandler}
          />
        </form>
      </div>
    );
  }
}

export default SearchBar;
