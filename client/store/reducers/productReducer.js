const initialState = {
  products: [],
  singleProduct: {},
};

import {
  LOAD_PRODUCTS,
  LOAD_PRODUCT,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  FILTER_PRODUCTS,
} from "../actions/index";

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return { ...state, products: action.products };
    case LOAD_PRODUCT:
      return { ...state, singleProduct: action.product };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product],
        selectedProduct: action.product,
      };
    case FILTER_PRODUCTS:
      // const length = action.productName.length || 0;
      const filteredProducts = state.products.filter((product) =>
        product.name.toLowerCase().includes(action.productName.toLowerCase())
      );
      return { ...state, products: [...filteredProducts] };

    case EDIT_PRODUCT:
      const theProducts = state.products.filter(
        (product) => product.id !== action.product.id
      );
      return { ...state, products: [...theProducts, action.product] };
    case DELETE_PRODUCT:
      const leftoverProducts = state.products.filter(
        (product) => product.id !== action.product.id
      );
      return { ...state, products: leftoverProducts };
    default:
      return state;
  }
};

export default productReducer;
