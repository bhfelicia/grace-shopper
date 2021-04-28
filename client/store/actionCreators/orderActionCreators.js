import { LOAD_ORDERS, EDIT_ORDER, LOAD_ORDER } from '../actions/index';

export const loadOrders = (orders) => {
  return {
    type: LOAD_ORDERS,
    orders,
  };
};

export const editOrders = (order) => {
  return {
    type: EDIT_ORDER,
    order,
  };
};

export const loadOrder = (order) => {
  return {
    type: LOAD_ORDER,
    order,
  };
};
