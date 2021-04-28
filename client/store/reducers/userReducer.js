import {
  EDIT_USER,
  DELETE_USER,
  LOAD_USER,
  LOAD_USERS,
  CREATE_USER,
} from '../actions/index';

const initialState = {
  users: [],
  selectedUser: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS:
      return { ...state, users: action.users };
    case LOAD_USER:
      return { ...state, selectedUser: action.user };
    case CREATE_USER:
      return {
        users: [...state.users, action.user],
        selectedUser: action.user,
      };
    case EDIT_USER:
      const theUsers = state.users.filter((user) => user !== action.user.id);
      return { ...state, users: [...theUsers, action.user] };
    case DELETE_USER:
      const withoutDeletedUser = state.users.filter(
        (user) => user.id !== action.user.id
      );
      return { ...state, users: withoutDeletedUser };
    default:
      return state;
  }
};

export default userReducer;
