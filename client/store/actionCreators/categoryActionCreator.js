import {
  LOAD_CATEGORIES,
  CREATE_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  LOAD_CATEGORY,
} from "../actions/index";

export const loadCategory = (category) => {
  return {
    type: LOAD_CATEGORY,
    category,
  };
};

export const loadCategories = (categories) => {
  return {
    type: LOAD_CATEGORIES,
    categories,
  };
};

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
