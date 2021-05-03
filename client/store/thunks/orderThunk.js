import axios from 'axios';
import {
  loadOrders,
  loadOrder,
  createCart,
  editCart,
  loadCart,
  deleteCart,
  editOrder,
} from '../actionCreators/orderActionCreators';

const fetchOrders = () => {
  return async (dispatch) => {
    const { data: orders } = await axios.get('/api/orders');
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

const addCart = (productId) => {
  return async (dispatch) => {
    const { data: cart } = await axios.post(`/api/orders/cart/create`, {
      headers: { authorization: window.localStorage.token },
      data: { productId },
    });
    dispatch(createCart(cart));
  };
};

const addToCart = (productId, cartId, productExists) => {
  return async (dispatch) => {
    const { data: updatedCart } = await axios.put(`/api/orders/cart/add`, {
      data: { productId, cartId, productExists },
    });
    dispatch(editCart(updatedCart));
  };
};

const deleteFromCart = (productId, cartId, productExists) => {
  // return async (dispatch) => {
  //   const { data: updatedCart } = await axios.put(`/api/orders/cart/add`, {
  //     data: { productId, cartId, productExists },
  //   });
  //   dispatch(editCart(updatedCart));
  // };
};

const fetchCart = () => {
  return async (dispatch) => {
    const { data: cart } = await axios.get(`/api/orders/user/cart`, {
      headers: { authorization: window.localStorage.token },
    });
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
  addToCart,
  destroyCart,
  fetchCart,
  fetchOrder,
  updateOrder,
  deleteCart,
};
