import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchReviews } from "../../store/thunks/reviewThunk";

class ProductReviews extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { getReviews } = this.props;
    // const { productId } = this.props;
    const productID = this.props.productId || 0;

    getReviews(Number(productID));
  }
  componentDidUpdate(prevProps) {
    if (prevProps.productId !== this.props.productId) {
      const { getReviews } = this.props;
      getReviews(Number(this.props.productId));
    }
  }

  render() {
    // this.componentDidMount();
    // console.log("our props", this.props);
    // const productID = this.props.productId || 0;
    // const { getReviews } = this.props;
    // getReviews(productID);
    // const { productId } = this.props;
    // if (!productID) return null;
    // else
    return (
      <div>
        {this.props.reviewReducer.reviews.map((review) => (
          <div key={review.id || review.newReview.id}>
            <h4>Review from {review.user.fullName}</h4>
            <h5>{review.title}</h5>{" "}
            <p>{review.rating || review.newReview.rating} stars</p>
            <p>{review.description || review.newReview.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ reviewReducer }) => ({
  reviewReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getReviews: (productId) => dispatch(fetchReviews(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviews);
