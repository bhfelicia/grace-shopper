import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditUser from './EditUser';

import { fetchUser } from '../../store/thunks/userThunk';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { motion } from 'framer-motion';

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
  }

  async componentDidMount() {
    await this.props.getUser(Number(this.props.match.params.id));
    const { data: loggedInUser } = await axios.get('/api/auth', {
      headers: { authorization: window.localStorage.getItem('token') },
    });
    this.setState({ loggedInUser });
  }

  displayUser() {
    const { selectedUser } = this.props.userReducer;
    return (
      <div>
        <motion.div
          transition={{ ease: 'easeOut', duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ x: [100, 0], opacity: 1 }}
        >
          <h3>{selectedUser.fullName}</h3>
          <h3>{selectedUser.email}</h3>
        </motion.div>
        <br></br>
        <motion.button
          transition={{ ease: 'easeOut', duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ x: [-100, 0], opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: [0.9, 1.05] }}
        >
          <Link to={`/users/${selectedUser.id}/edit`}>edit</Link>
        </motion.button>
        {/* <EditUser user={selectedUser} /> */}
      </div>
    );
  }

  render() {
    console.log(this.state, 'state here!!!!');
    if (
      this.state.loggedInUser.isAdmin ||
      this.state.loggedInUser.id === this.props.userReducer.selectedUser.id
    ) {
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
