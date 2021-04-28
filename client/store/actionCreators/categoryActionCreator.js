import {
  CREATE_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
} from '../actions/index';

export const createCategory = (category) => {
  return {
    type: CREATE_CATEGORY,
    category,
  };
};

export const editCategory = (category) => {
  return {
    type: EDIT_CATEGORY,
    category,
  };
};

export const deleteCategory = (category) => {
  return {
    type: DELETE_CATEGORY,
    category,
  };
};
