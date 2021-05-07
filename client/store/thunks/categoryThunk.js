import axios from "axios";
import {
  loadCategory,
  loadCategories,
  createCategory,
  editCategory,
  deleteCategory,
} from "../actionCreators/categoryActionCreator";

const fetchCategories = () => {
  return async (dispatch) => {
    const { data: categories } = await axios.get("/api/categories");
    dispatch(loadCategories(categories));
  };
};

const fetchCategory = (categoryId) => {
  return async (dispatch) => {
    const { data: category } = await axios.get(`/api/categories/${categoryId}`);
    dispatch(loadCategory(category));
  };
};

const addCategory = (newCategory, history) => {
  return async (dispatch) => {
    const headerToken = {
      headers: { authorization: window.localStorage.getItem("token") },
    };
    const { data: category } = await axios.post(
      `/api/categories`,
      newCategory,
      headerToken
    );
    dispatch(createCategory(category));
    history.push("/categories");
  };
};

const destroyCategory = (category) => {
  return async (dispatch) => {
    const headerToken = {
      headers: { authorization: window.localStorage.getItem("token") },
    };
    await axios.delete(`/api/categories/${category.id}`, headerToken);
    dispatch(deleteCategory(category));
  };
};

const updateCategory = (category, history) => {
  return async (dispatch) => {
    const headerToken = {
      headers: { authorization: window.localStorage.getItem("token") },
    };
    const { data: updatedCategory } = await axios.put(
      `/api/categories/${category.id}`,
      category,
      headerToken
    );
    dispatch(editCategory(updatedCategory));
    history.push(`/categories/`);
  };
};

export {
  fetchCategories,
  fetchCategory,
  addCategory,
  destroyCategory,
  updateCategory,
};
