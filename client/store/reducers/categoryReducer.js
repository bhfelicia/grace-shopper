import {
  LOAD_CATEGORY,
  LOAD_CATEGORIES,
  CREATE_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
} from "../actions/index";

const initialState = {
  categories: [],
  selectedCategory: {},
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CATEGORY:
      return { ...state, selectedCategory: action.category };
    case LOAD_CATEGORIES:
      return { ...state, categories: action.categories };
    case CREATE_CATEGORY:
      return { ...state, categories: [...state.categories, action.category] };
    case EDIT_CATEGORY:
      const withoutEdited = state.categories.filter(
        (category) => category.id !== action.category.id
      );
      return { ...state, categories: [...withoutEdited, action.category] };
    case DELETE_CATEGORY:
      const withoutDeleted = state.categories.filter(
        (category) => category.id !== action.category.id
      );
      return { ...state, categories: withoutDeleted };
    default:
      return state;
  }
};

export default categoryReducer;
