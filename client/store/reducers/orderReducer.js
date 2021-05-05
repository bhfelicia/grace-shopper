import {
  LOAD_ORDERS,
  LOAD_ORDER,
  CREATE_CART,
  EDIT_CART,
  DELETE_CART,
  DELETE_PRODUCT_FROM_CART,
  LOAD_CART,
} from '../actions/index';

const initialState = {
  orders: [],
  currentCart: {},
  order: [],
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
      // const filteredOrder = state.orders.filter((order) => {
      //   return order.id !== state.currentCart.id;
      // });
      // return {
      //   orders: [...filteredOrder, action.cart],
      //   currentCart: action.cart,
      // }; //revisit cause arjan can't think right now
      //ARJAN DID THIS DONT WORRY ABOUT IT
      return { ...state, currentCart: action.cart };
    case DELETE_CART:
      return { ...state, currentCart: {} };
    case DELETE_PRODUCT_FROM_CART:
      return { ...state, currentCart: action.cart };
    default:
      return state;
  }
};

export default orderReducer;
