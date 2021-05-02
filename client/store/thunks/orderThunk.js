import axios from "axios";
import {
  loadOrders,
  loadOrder,
  createCart,
  editCart,
  loadCart,
  deleteCart,
  editOrder,
} from "../actionCreators/orderActionCreators";

const fetchOrders = () => {
  return async (dispatch) => {
    const { data: orders } = await axios.get("/api/orders");
    dispatch(loadOrders(orders));
  };
};

const fetchOrder = (orderId) => {
  return async (dispatch) => {
    const { data: order } = await axios.get(`/api/orders/${orderId}`);
    dispatch(loadOrder(order));
  };
};

const updateOrder = (newOrderData) => {
  return async (dispatch) => {
    const { data: order } = await axios.put(
      `/api/orders/${newOrderData.id}`,
      newOrderData
    );
    dispatch(editOrder(order));
  };
};

const addCart = (newCart, userId) => {
  return async (dispatch) => {
    const { data: cart } = await axios.post(
      `/api/orders/${userId}/cart/create`,
      newCart
    );
    dispatch(createCart(cart));
  };
};

const updateCart = (cart) => {
  return async (dispatch) => {
    const { data: updatedCart } = await axios.put(
      `/api/orders/${cart.id}`,
      cart
    );
    dispatch(editCart(updatedCart));
  };
};

const fetchCart = (userId) => {
  return async (dispatch) => {
    const { data: cart } = await axios.get(`/api/orders/user/${userId}/cart`);
    dispatch(loadCart(cart));
  };
};

const destroyCart = (cart) => {
  return async (dispatch) => {
    await axios.delete(`/api/orders/${cart.id}`);
    dispatch(deleteCart(cart));
  };
};

export {
  fetchOrders,
  addCart,
  updateCart,
  destroyCart,
  fetchCart,
  fetchOrder,
  updateOrder,
};
