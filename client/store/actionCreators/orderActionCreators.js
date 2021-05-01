import {
  LOAD_ORDERS,
  LOAD_ORDER,
  CREATE_CART,
  EDIT_CART,
  LOAD_CART,
  DELETE_CART,
  UPDATE_ORDER,
} from '../actions/index';

export const loadOrders = (orders) => {
  return {
    type: LOAD_ORDERS,
    orders,
  };
};

export const loadOrder = (order) => {
  return {
    type: LOAD_ORDER,
    order,
  };
};

export const editOrder = (order) => {
  return {
    type: UPDATE_ORDER,
    order,
  };
};

export const createCart = (cart) => {
  return {
    type: CREATE_CART,
    cart,
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
