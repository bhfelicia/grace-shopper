import {
  LOAD_REVIEWS,
  CREATE_REVIEW,
  EDIT_REVIEW,
  DELETE_REVIEW,
} from "../actions/index";

const initialState = {
  reviews: [],
  review: {},
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      return { ...state, reviews: action.reviews };
    case CREATE_REVIEW:
      return { ...state, review: action.review };
    case EDIT_REVIEW:
      const theReview = state.reviews.filter(
        (review) => review.id !== action.review.id
      );
      return { ...state, reviews: [...theReview, action.review] };
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
