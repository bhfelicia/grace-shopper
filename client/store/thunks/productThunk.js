import axios from "axios";
import {
  loadProducts,
  loadProduct,
  createProduct,
  editProduct,
  deleteProduct,
  findProducts,
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

const filterProducts = (productName) => {
  return async (dispatch) => {
    // const { data: filteredProducts } = await axios.get(`/api/products/search`, {
    //   productName,
    // });

    //I apparently have to pass it in as a variable with the product as an object, maybe because thats how it will get accessed later?
    const productObj = { productName };

    const { data: filteredProducts } = await axios.get(
      `/api/products/search`,
      productObj
    );
    dispatch(findProducts(filteredProducts));
  };
};

const updateProduct = (product, history) => {
  return async (dispatch) => {
    const { data: updatedProduct } = await axios.put(
      `/api/products/${product.id}`,
      product
    );
    dispatch(editProduct(updatedProduct));
    history.push(`/products/${updatedProduct.id}`);
  };
};

export {
  fetchProducts,
  fetchProduct,
  addProduct,
  destroyProduct,
  updateProduct,
  filterProducts,
};
