import {
  EDIT_USER,
  DELETE_USER,
  LOAD_USER,
  CREATE_USER,
  LOAD_USERS,
} from "../actions/index";

export const editUser = (user) => {
  return {
    type: EDIT_USER,
    user,
  };
};

export const deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};
export const loadUser = (user) => {
  return {
    type: LOAD_USER,
    user,
  };
};

export const createUser = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};
export const loadUsers = (users) => {
  return {
    type: LOAD_USERS,
    users,
  };
};
