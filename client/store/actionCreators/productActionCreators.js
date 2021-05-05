import {
  LOAD_PRODUCTS,
  LOAD_PRODUCT,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  FILTER_PRODUCTS,
} from "../actions/index";

export const loadProducts = (products) => {
  return {
    type: LOAD_PRODUCTS,
    products,
  };
};
export const loadProduct = (product) => {
  return {
    type: LOAD_PRODUCT,
    product,
  };
};
export const createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product,
  };
};
export const editProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
    product,
  };
};

export const findProducts = (products) => {
  return {
    type: FILTER_PRODUCTS,
    products,
  };
};

export const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
  };
};
