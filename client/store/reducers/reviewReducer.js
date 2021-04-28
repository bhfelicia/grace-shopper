import {
  LOAD_REVIEWS,
  CREATE_REVIEW,
  EDIT_REVIEW,
  DELETE_REVIEW,
} from '../actions/index';

const initialState = {
  reviews: [],
  selectedReview: {},
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      return { ...state, reviews: action.reviews };
    case CREATE_REVIEW:
      return { ...state, selectedReview: action.review };
    case EDIT_REVIEW:
      const theReviews = state.reviews.filter(
        (review) => review.id !== action.review.id
      );
      return { ...state, reviews: [...theReviews, action.review] };
    case DELETE_REVIEW:
      const withoutDeletedReview = state.reviews.filter(
        (review) => review.id !== action.review.id
      );
      return { ...state, reviews: withoutDeletedReview };
    default:
      return state;
  }
};

export default reviewReducer;
