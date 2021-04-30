import {
  LOAD_ORDERS,
  LOAD_ORDER,
  CREATE_CART,
  EDIT_CART,
  DELETE_CART,
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
      const currCart = state.orders.filter(
        (order) => order.status === 'in progress'
      )[0];
      return { ...state, currentCart: currCart };
    case EDIT_CART:
      const filteredOrder = state.orders.filter((order) => {
        return order.id !== state.currentCart.id;
      });
      return {
        orders: [...filteredOrder, action.cart],
        currentCart: action.cart,
      }; //revisit cause arjan can't think right now
    case DELETE_CART:
      return { ...state, currentCart: {} };
    default:
      return state;
  }
};

export default orderReducer;
