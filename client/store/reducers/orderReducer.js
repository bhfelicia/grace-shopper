import {
  LOAD_ORDERS,
  CREATE_CART,
  EDIT_CART,
  DELETE_CART,
  LOAD_CART,
} from "../actions/index";

const initialState = {
  orders: [],
  currentCart: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      const createdOrders = state.orders.filter(
        (order) => order.status !== "in progress"
      );
      return { ...state, orders: createdOrders };
    case CREATE_CART:
      return { ...state, currentCart: action.cart };
    case LOAD_CART:
      const currCart = state.orders.filter(
        (order) => order.status === "in progress"
      )[0];
      return { ...state, currentCart: currCart };
    case EDIT_CART:
      return { ...state, currentCart: action.cart };
    case DELETE_CART:
      return { ...state };
    default:
      return state;
  }
};

export default orderReducer;
