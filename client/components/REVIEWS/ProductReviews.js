import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchReviews } from "../../store/thunks/reviewThunk";

import Emoji from "react-emoji-render";

class ProductReviews extends Component {
  constructor(props) {
    super(props);
    this.rating = this.rating.bind(this);
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
  rating(rating) {
    if (rating === 5) {
      return (
        <h2>
          <Emoji text=":star::star::star::star::star:" />
        </h2>
      );
    } else if (rating === 4) {
      return (
        <h2>
          <Emoji text=":star::star::star::star:" />
        </h2>
      );
    } else if (rating === 3) {
      return (
        <h2>
          <Emoji text=":star::star::star:" />
        </h2>
      );
    } else if (rating === 2) {
      return (
        <h2>
          <Emoji text=":star::star:" />
        </h2>
      );
    } else if (rating === 1) {
      return (
        <h2>
          <Emoji text=":star:" />
        </h2>
      );
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
    if (
      !this.props.reviewReducer.reviews ||
      !this.props.reviewReducer.reviews.length
    ) {
      return (
        <div>
          <h1>
            <Emoji text=":confused:" />
          </h1>
          <h3>Looks like no one's reviewed this product yet.</h3>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Reviews</h1>
          <div id="reviewsTop">
            {this.props.reviewReducer.reviews.map((review) => (
              <div key={review.id || review.newReview.id}>
                <div>
                  {review.rating
                    ? this.rating(review.rating)
                    : this.rating(review.newReview.rating)}
                  <h4>Review from {review.user.fullName}</h4>
                  <h5>{review.title || review.newReview.title}</h5>
                  <p>{review.description || review.newReview.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ reviewReducer }) => ({
  reviewReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getReviews: (productId) => dispatch(fetchReviews(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviews);
