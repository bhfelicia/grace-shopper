import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../store/thunks/productThunk';
import { fetchUsers, destroyUser } from '../../store/thunks/userThunk';

import axios from 'axios';

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
          <li key={user.id}>
            {<Link to={`/users/${user.id}`}>{user.fullName}</Link>}
            <button
              type="button"
              onClick={this.deleteUserHandler}
              value={user.id}
            >
              Delete User
            </button>
          </li>
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
          <ul>{this.displayUsers()}</ul>
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
