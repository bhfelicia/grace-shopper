import {
  LOAD_ORDERS,
  LOAD_ORDER,
  CREATE_CART,
  EDIT_CART,
  DELETE_CART,
  DELETE_PRODUCT_FROM_CART,
  LOAD_CART,
  SET_RECENT_ORDER,
} from "../actions/index";

const initialState = {
  orders: [],
  currentCart: {},
  order: [],
  recentOrder: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      return { ...state, orders: action.orders };
    case LOAD_ORDER:
      return { ...state, order: action.order };
    case CREATE_CART:
      return { ...state, currentCart: action.cart };
    case LOAD_CART:
      return { ...state, currentCart: action.cart };
    case EDIT_CART:
      return { ...state, currentCart: action.cart };
    case DELETE_CART:
      return { ...state, currentCart: {} };
    case DELETE_PRODUCT_FROM_CART:
      return { ...state, currentCart: action.cart };
    case SET_RECENT_ORDER:
      return { ...state, recentOrder: action.order };
    default:
      return state;
  }
};

export default orderReducer;
