import axios from 'axios';
import store from '../store';
import actions from '../actions';
import {
  editUser,
  deleteUser,
  loadUsers,
  loadUser,
  createUser,
} from '../actionCreators/userActionCreators';

const fetchUsers = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/users');
    const users = response.data;
    dispatch(loadUsers(users));
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

export { fetchUsers, updateUser };
