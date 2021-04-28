import {
  LOAD_REVIEWS,
  CREATE_REVIEW,
  EDIT_REVIEW,
  DELETE_REVIEW,
} from '../actions/index';

export const loadReviews = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    reviews,
  };
};

export const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

export const editReview = (review) => {
  return {
    type: EDIT_REVIEW,
    review,
  };
};

export const deleteReview = (review) => {
  return {
    type: DELETE_REVIEW,
    review,
  };
};
