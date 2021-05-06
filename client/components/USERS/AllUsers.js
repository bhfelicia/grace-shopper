import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../store/thunks/productThunk';
import { fetchUsers, destroyUser } from '../../store/thunks/userThunk';

import axios from 'axios';

import { motion } from 'framer-motion';

class AllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: {
        fullName: '',
        id: 0,
        isAdmin: false,
        role: '',
        first: '',
        last: '',
        password: '',
        email: '',
        createdAt: '',
        updatedAt: '',
      },
    };
    this.displayUsers = this.displayUsers.bind(this);
    this.deleteUserHandler = this.deleteUserHandler.bind(this);
  }

  async componentDidMount() {
    this.props.getUsers();
    const { data: loggedInUser } = await axios.get('/api/auth', {
      headers: { authorization: window.localStorage.getItem('token') },
    });
    this.setState({ loggedInUser });
  }

  deleteUserHandler(event) {
    const userToDelete = +event.target.value;
    this.props.deleteUser(userToDelete);
  }

  displayUsers() {
    const { users } = this.props.userReducer;
    if (users.length === 0) {
      return null;
    } else {
      const userList = users.map((user) => {
        return (
          <motion.div key={user.id}>
            <motion.h2
              transition={{ ease: 'easeOut', duration: 1 }}
              initial={{ opacity: 0 }}
              animate={{ x: [100, 0], opacity: 1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <Link to={`/users/${user.id}`}>{user.fullName}</Link>
            </motion.h2>
            <motion.button
              transition={{ ease: 'easeOut', duration: 1 }}
              initial={{ opacity: 0 }}
              animate={{ x: [-100, 0], opacity: 1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: [0.9, 1.05] }}
              type="button"
              onClick={this.deleteUserHandler}
              value={user.id}
            >
              Delete User
            </motion.button>
          </motion.div>
        );
      });
      return userList;
    }
  }

  render() {
    const style = {
      width: 600,
    };
    if (this.state.loggedInUser.isAdmin) {
      return (
        <div>
          <motion.ul>{this.displayUsers()}</motion.ul>
        </div>
      );
    } else {
      return (
        <div>
          <img
            src="https://media3.giphy.com/media/8abAbOrQ9rvLG/200.gif"
            style={style}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = ({ userReducer }) => ({
  userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(fetchUsers()),
  deleteUser: (userId) => dispatch(destroyUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
