import axios from "axios";

import {
  editUser,
  deleteUser,
  loadUsers,
  loadUser,
  createUser,
} from "../actionCreators/userActionCreators";

//pass in entire user object to dispatch because reducer needs user object to filter out

const fetchUsers = () => {
  return async (dispatch) => {
    const headerToken = {
      headers: { authorization: window.localStorage.getItem("token") },
    };
    const response = await axios.get("/api/users", headerToken);
    const users = response.data;
    dispatch(loadUsers(users));
  };
};

const fetchUser = (userId) => {
  return async (dispatch) => {
    const headerToken = {
      headers: {
        authorization: window.localStorage.getItem("token"),
      },
    };
    const { data: user } = await axios.get(`/api/users/${userId}`, headerToken);
    dispatch(loadUser(user));
  };
};

const addUser = (newUser) => {
  return async (dispatch) => {
    const { data: user } = await axios.post(`/api/users/`, newUser, {
      headers: { authorization: window.localStorage.getItem("token") },
    });
    dispatch(createUser(user));
  };
};

//changed this from user to userId for testing
const destroyUser = (userId) => {
  return async (dispatch) => {
    const headerToken = {
      headers: { authorization: window.localStorage.getItem("token") },
    };
    await axios.delete(`/api/users/${userId}`, headerToken);
    dispatch(deleteUser(userId));
  };
};

const updateUser = (user, history) => {
  return async (dispatch) => {
    const { data: updatedUser } = await axios.put(
      `/api/users/${user.id}`,
      user
    );
    dispatch(editUser(updatedUser));
    history.push(`/users/${user.id}`);
  };
};

export { fetchUsers, fetchUser, updateUser, destroyUser, addUser };
