import axios from 'axios';
import {
  loadOrders,
  createCart,
  editCart,
  loadCart,
  deleteCart,
} from '../actionCreators/orderActionCreators';

const fetchOrders = () => {
  return async (dispatch) => {
    const { data: orders } = await axios.get('/api/orders');
    dispatch(loadOrders(orders));
  };
};

const addCart = (newCart) => {
  return async (dispatch) => {
    const { data: cart } = await axios.post(`/api/orders/`, newCart);
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

// const loadCart = (userId) => {
//   return async (dispatch) => {
//     const { data: cart } = await axios.get(`/api/orders/${}`
//   }
// }

//Test!!!!!!!!!!!!!!!!!!!!!
const destroyCart = (cart) => {
  return async (dispatch) => {
    await axios.delete(`/api/orders/${cart.id}`);
    dispatch(deleteCart(cart));
  };
};

export { fetchOrders, addCart, updateCart, destroyCart };
