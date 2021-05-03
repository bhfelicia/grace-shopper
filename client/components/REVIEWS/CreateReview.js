import React, { Component } from "react";
import { connect } from "react-redux";

import { addReview } from "../../store/thunks/reviewThunk";

class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userReducer.selectedUser.id || "",
      productId: this.props.productId || "",
      title: "",
      description: "",
      rating: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.createReviewHandler = this.createReviewHandler.bind(this);
  }
  // componentDidMount() {
  //   this.setState({userI})
  // }
  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  createReviewHandler(ev) {
    ev.preventDefault();
    const newReview = {
      ...this.state,
      userId: this.props.userReducer.selectedUser.id,
      productId: this.props.productId,
    };
    this.props.createReview(newReview);
  }
  render() {
    console.log("current props: ", this.props);
    if (!this.props.userReducer.selectedUser.id) {
      return null;
    } else {
      const ratings = ["--", 1, 2, 3, 4, 5];
      return (
        <div>
          <form onSubmit={this.createReviewHandler}>
            <h4>Add a review for this product</h4>
            <label>Title </label>
            <input
              type="text"
              value={this.state.title}
              name="title"
              onChange={this.handleChange}
            />
            <br></br>
            <label>Description </label>
            <input
              type="text"
              value={this.state.description}
              name="description"
              onChange={this.handleChange}
            />
            <br></br>
            <label>Rating </label>
            <select name="rating" onChange={this.handleChange}>
              {ratings.map((rating) => (
                <option key={rating}>{rating}</option>
              ))}
            </select>
            <br></br>
            <button type="submit">Add your review</button>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ userReducer, reviewReducer }) => ({
  userReducer,
  reviewReducer,
});

const mapDispatchToProps = (dispatch) => ({
  createReview: (review) => dispatch(addReview(review)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateReview);
