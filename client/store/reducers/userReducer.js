import {
  EDIT_USER,
  DELETE_USER,
  LOAD_USER,
  LOAD_USERS,
  CREATE_USER,
} from "../actions/index";

const initialState = {
  users: [],
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS:
      return { ...state, users: action.users };
    case LOAD_USER:
      return { ...state, user: action.user };
    case CREATE_USER:
      return { users: [...state.users, action.user], user: action.user };
    case EDIT_USER:
      const theUser = state.users.filter((user) => user !== action.user.id);
      return { ...state, users: [...theUser, action.user] };
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
