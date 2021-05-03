import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditUser from './EditUser';

import { fetchUser } from '../../store/thunks/userThunk';
import { Link } from 'react-router-dom';

import axios from 'axios';

class SingleUser extends Component {
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
    console.log(this.props, 'at constructor');
  }

  async componentDidMount() {
    await this.props.getUser(Number(this.props.match.params.id));
    console.log(this.props, 'at mount');
    const { data: loggedInUser } = await axios.get('/api/auth', {
      headers: { authorization: window.localStorage.getItem('token') },
    });
    console.log(loggedInUser, 'LOGGED IN USER');
    this.setState({ loggedInUser });
  }

  displayUser() {
    const { selectedUser } = this.props.userReducer;
    return (
      <div>
        <h3>{selectedUser.fullName}</h3>
        <h3>{selectedUser.email}</h3>
        <br></br>
        <Link to={`/users/${selectedUser.id}/edit`}>Edit User</Link>
        {/* <EditUser user={selectedUser} /> */}
      </div>
    );
  }

  render() {
    console.log(this.state, 'state here!!!!');
    if (this.state.loggedInUser.isAdmin) {
      return <div>{this.displayUser()}</div>;
    } else {
      return <div>You do not have access!</div>;
    }
    // if (window.localStorage.isAdmin && window.localStorage.role !== "GUEST") {
    //   isValid = this.displayUser();
    // }
  }
}

const mapStateToProps = ({ userReducer }) => ({
  userReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => dispatch(fetchUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);
