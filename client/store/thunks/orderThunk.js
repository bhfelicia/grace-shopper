import axios from "axios";
import {
  loadOrders,
  loadOrder,
  createCart,
  editCart,
  loadCart,
  deleteCart,
  editOrder,
  deleteProductFromCart,
  getRecent,
} from "../actionCreators/orderActionCreators";

const fetchOrders = () => {
  return async (dispatch) => {
    const headerToken = {
      headers: { authorization: window.localStorage.getItem("token") },
    };
    const { data: orders } = await axios.get("/api/orders", headerToken);
    dispatch(loadOrders(orders));
  };
};

const fetchOrder = (orderId) => {
  return async (dispatch) => {
    const headerToken = {
      headers: { authorization: window.localStorage.getItem("token") },
    };
    const { data: order } = await axios.get(
      `/api/orders/${orderId}`,
      headerToken
    );
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

const checkoutOrder = (orderId, history) => {
  return async (dispatch) => {
    const { data: cartToOrder } = await axios.put(
      `/api/orders/checkout/${orderId}`,
      {
        data: { id: orderId },
      }
    );
    dispatch(editCart(cartToOrder));
    dispatch(deleteCart(cartToOrder));
    history.push("/orderSummary");
  };
};

const fetchRecent = (orderId) => {
  return async (dispatch) => {
    const { data: order } = await axios.get(`/api/orders/${orderId}`);
    dispatch(getRecent(order));
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

const addOneToCart = (productId, cartId) => {
  return async (dispatch) => {
    const { data: updatedCart } = await axios.put("/api/orders/cart/addOne", {
      data: { productId, cartId },
    });
    dispatch(editCart(updatedCart));
  };
  //LEFT OFF HERE!!!!!!!!!!!!!!!!!!!!!!
  // return async (dispatch) => {
  //   const { data: updatedCart } = await axios.put(`/api/orders/cart/add`, {
  //     data: { productId, cartId, productExists },
  //   });
  //   dispatch(editCart(updatedCart));
  // };
};

const deleteFromCart = (singleItem, productId, orderId) => {
  return async (dispatch) => {
    if (singleItem) {
      await axios.put("/api/orders/cart/product/deleteSingleItem", {
        productId: productId,
        orderId: orderId,
      });
    } else {
      await axios.delete(`/api/orders/cart/product/delete`, {
        data: {
          productId: productId,
          orderId: orderId,
        },
      });
    }
    const { data: updatedCart } = await axios.get(`/api/orders/user/cart`, {
      headers: { authorization: window.localStorage.getItem("token") },
    });
    dispatch(deleteProductFromCart(updatedCart));
  };
};

const fetchCart = () => {
  return async (dispatch) => {
    const { data: cart } = await axios.get(`/api/orders/user/cart`, {
      headers: { authorization: window.localStorage.getItem("token") },
    });
    dispatch(loadCart(cart));
  };
};

const clearCart = (cartId) => {
  return async (dispatch) => {
    const { data: cart } = await axios.put(`/api/orders/${cartId}`);
    dispatch(deleteCart(cart));
  };
};

export {
  fetchOrders,
  addCart,
  addToCart,
  addOneToCart,
  clearCart,
  fetchCart,
  fetchOrder,
  updateOrder,
  deleteFromCart,
  checkoutOrder,
  fetchRecent,
};
