import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../store/thunks/userThunk';

import axios from 'axios';

class Settings extends Component {
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
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    await this.props.getUsers();
    const { data: loggedInUser } = await axios.get('/api/auth', {
      headers: { authorization: window.localStorage.getItem('token') },
    });
    this.setState({ loggedInUser });
  }

  logout() {
    window.localStorage.clear();
  }

  render() {
    const fullName =
      this.state.loggedInUser.first + ' ' + this.state.loggedInUser.last;
    if (this.state.loggedInUser.isAdmin) {
      return (
        <div className="settings-container">
          <div className="settings-container-left">
            <div>Welcome {fullName} </div>
          </div>
          <div className="settings-container-right">
            <div>
              <Link style={{ textDecoration: 'none' }} to="/categories">
                Categories
              </Link>
            </div>
            <div>
              <Link style={{ textDecoration: 'none' }} to="/products">
                Products
              </Link>
            </div>
            <div>
              <Link style={{ textDecoration: 'none' }} to="/users">
                Users
              </Link>
            </div>
            <div>
              <Link style={{ textDecoration: 'none' }} to="/orders">
                Orders
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>You do not have access.</div>;
    }
  }
}
const mapState = ({ userReducer }) => ({
  userReducer,
});

const mapDispatch = (dispatch) => ({
  getUsers: () => dispatch(fetchUsers()),
});

export default connect(mapState, mapDispatch)(Settings);
