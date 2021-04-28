import {
  LOAD_ORDERS,
  EDIT_CART,
  LOAD_CART,
  DELETE_CART,
} from "../actions/index";

export const loadOrders = (orders) => {
  return {
    type: LOAD_ORDERS,
    orders,
  };
};

export const editCart = (cart) => {
  return {
    type: EDIT_CART,
    cart,
  };
};

export const loadCart = (cart) => {
  return {
    type: LOAD_CART,
    cart,
  };
};

export const deleteCart = (cart) => {
  return {
    type: DELETE_CART,
    cart,
  };
};
