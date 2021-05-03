import axios from "axios";
import {
  loadProducts,
  loadProduct,
  createProduct,
  editProduct,
  deleteProduct,
} from "../actionCreators/productActionCreators";

//added delete route to product routes, check with team

const fetchProducts = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/products");
    const products = response.data;
    dispatch(loadProducts(products));
  };
};

const fetchProduct = (productId) => {
  return async (dispatch) => {
    const { data: product } = await axios.get(`/api/products/${productId}`);
    dispatch(loadProduct(product));
  };
};

const addProduct = (newProduct, history) => {
  return async (dispatch) => {
    const { data: product } = await axios.post(`/api/products/`, newProduct);
    dispatch(createProduct(product));
    history.push(`/products/${product.id}`);
  };
};

const destroyProduct = (product) => {
  return async (dispatch) => {
    await axios.delete(`/api/products/${product.id}`);
    dispatch(deleteProduct(product));
  };
};

const updateProduct = (product) => {
  return async (dispatch) => {
    const { data: updatedProduct } = await axios.put(
      `/api/products/${product.id}`,
      product
    );
    dispatch(editProduct(updatedProduct));
  };
};

export {
  fetchProducts,
  fetchProduct,
  addProduct,
  destroyProduct,
  updateProduct,
};
