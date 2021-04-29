import {
  LOAD_ORDERS,
  CREATE_CART,
  EDIT_CART,
  DELETE_CART,
  LOAD_CART,
} from '../actions/index';

const initialState = {
  orders: [],
  currentCart: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      //state = { ...state, orders: action.orders };
      // const createdOrders = state.orders.filter(
      //   (order) => order.status !== 'in progress'
      // );
      // arjan/IP changed this, consult before uncommenting
      return { ...state, orders: action.orders };
    case CREATE_CART:
      return { ...state, currentCart: action.cart };
    case LOAD_CART:
      const currCart = state.orders.filter(
        (order) => order.status === 'in progress'
      )[0];
      return { ...state, currentCart: currCart };
    case EDIT_CART:
      return { ...state, currentCart: action.cart }; //revisit cause arjan can't think right now
    case DELETE_CART:
      return { ...state, currentCart: {} };
    default:
      return state;
  }
};

export default orderReducer;
