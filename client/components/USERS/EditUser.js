import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, updateUser } from "../../store/thunks/userThunk";
import axios from "axios";

import { motion } from "framer-motion";
import Emoji from "react-emoji-render";

//bring in fetchUser thunk, use it in componentDidMount to fetch user so you can keep a user
//on refresh
//(want to fetch a user everytime component refreshes)
//OnCHange issue but refresh with persistency will solve that
//fixed id in user reducer

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.userReducer.selectedUser.id || "",
      first: this.props.userReducer.selectedUser.first || "",
      last: this.props.userReducer.selectedUser.last || "",
      password: this.props.userReducer.selectedUser.password || "",
      email: this.props.userReducer.selectedUser.email || "",
      loggedInUser: {
        fullName: "",
        id: 0,
        isAdmin: false,
        role: "",
        first: "",
        last: "",
        password: "",
        email: "",
        createdAt: "",
        updatedAt: "",
      },
    };

    this.editUserHandler = this.editUserHandler.bind(this);
    this.submitUpdateHandler = this.submitUpdateHandler.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.render();
    }
  }
  async componentDidMount() {
    await this.props.getUser(Number(this.props.match.params.id));
    const {
      first,
      last,
      id,
      password,
      email,
    } = this.props.userReducer.selectedUser;
    const { data: loggedInUser } = await axios.get("/api/auth", {
      headers: { authorization: window.localStorage.getItem("token") },
    });
    this.setState({
      id,
      first,
      last,
      password,
      email,
      loggedInUser,
    });
  }

  editUserHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submitUpdateHandler(event) {
    event.preventDefault();
    const editedUser = { ...this.state };
    this.props.editUser(editedUser);
  }

  render() {
    const style = {
      width: 600,
    };
    if (
      this.state.loggedInUser.isAdmin ||
      this.props.userReducer.selectedUser.id === +this.props.match.params.id
    ) {
      return (
        <motion.div
          transition={{ ease: "easeOut", duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ x: [100, 0], opacity: 1 }}
        >
          <form onSubmit={this.submitUpdateHandler}>
            <h4>Edit User</h4>
            <div>
              <input
                type="text"
                value={this.state.first}
                name="first"
                onChange={this.editUserHandler}
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={this.state.last}
                name="last"
                onChange={this.editUserHandler}
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={this.state.email}
                name="email"
                onChange={this.editUserHandler}
                required
              />
            </div>
            <div>
              <input
                type="password"
                // value={this.state.password}
                name="password"
                onChange={this.editUserHandler}
                required
                placeholder="password"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: [0.9, 1.05] }}
              type="submit"
            >
              update
            </motion.button>
          </form>
        </motion.div>
      );
    } else {
      return (
        <motion.div
          transition={{ ease: "easeOut", duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ x: [100, 0], opacity: 1 }}
        >
          <h1>
            <Emoji text=":grimacing:" />
          </h1>
          <h2>You do not have access.</h2>
        </motion.div>
      );
    }
  }
}
const mapStateToProps = ({ userReducer }) => ({
  userReducer,
});

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    editUser: (user) => dispatch(updateUser(user, history)),
    getUser: (id) => dispatch(fetchUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
