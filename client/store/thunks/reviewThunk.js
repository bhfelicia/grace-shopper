import axios from "axios";
import {
  loadReviews,
  createReview,
  editReview,
  deleteReview,
} from "../actionCreators/reviewActionCreators";

const fetchReviews = (productId) => {
  return async (dispatch) => {
    const { data: reviews } = await axios.get(
      `/api/products/${productId}/reviews`
    );
    dispatch(loadReviews(reviews));
  };
};

const addReview = (newReview) => {
  return async (dispatch) => {
    const headerToken = {
      headers: { authorization: window.localStorage.getItem("token") },
    };
    const { data: review } = await axios.post(
      `/api/reviews/`,
      newReview,
      headerToken
    );
    dispatch(createReview(review));
  };
};

const updateReview = (review) => {
  return async (dispatch) => {
    const { data: updatedReview } = await axios.put(
      `/api/reviews/${review.id}`,
      review
    );
    dispatch(editReview(updatedReview));
  };
};

const destroyReview = (review) => {
  return async (dispatch) => {
    await axios.delete(`/api/reviews/${review.id}`);
    dispatch(deleteReview(review));
  };
};

export { fetchReviews, addReview, updateReview, destroyReview };
