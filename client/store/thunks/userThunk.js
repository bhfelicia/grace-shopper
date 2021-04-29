import axios from 'axios';

import {
  editUser,
  deleteUser,
  loadUsers,
  loadUser,
  createUser,
} from '../actionCreators/userActionCreators';

//pass in entire user object to dispatch because reducer needs user object to filter out

const fetchUsers = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/users');
    const users = response.data;
    dispatch(loadUsers(users));
  };
};

const fetchUser = (userId) => {
  return async (dispatch) => {
    const { data: user } = await axios.get(`/api/users/${userId}`);
    dispatch(loadUser(user));
  };
};

const addUser = (newUser) => {
  return async (dispatch) => {
    const { data: user } = await axios.post(`/api/users/`, newUser);
    dispatch(createUser(user));
  };
};

const destroyUser = (user) => {
  return async (dispatch) => {
    await axios.delete(`/api/users/${user.id}`);
    dispatch(deleteUser(user));
  };
};

const updateUser = (user) => {
  return async (dispatch) => {
    const { data: updatedUser } = await axios.put(
      `/api/users/${user.id}`,
      user
    );
    dispatch(editUser(updatedUser));
  };
};

export { fetchUsers, fetchUser, updateUser, destroyUser, addUser };
