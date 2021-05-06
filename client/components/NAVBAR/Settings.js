import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../store/thunks/userThunk';

import axios from 'axios';
import { motion } from 'framer-motion';
import Emoji from 'react-emoji-render';

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
        <motion.div
          className="settings-container"
          transition={{ ease: 'easeOut', duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ x: [100, 0], opacity: 1 }}
        >
          <div className="settings-container-left">
            <h1>welcome, {fullName} </h1>
          </div>
          <div className="settings-container-right">
            <motion.h1
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <Link style={{ textDecoration: 'none' }} to="/categories">
                <Emoji text=":books:" /> categories
              </Link>
            </motion.h1>
            <motion.h1
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <Link style={{ textDecoration: 'none' }} to="/products">
                <Emoji text="&#129750;" /> products
              </Link>
            </motion.h1>
            <motion.h1
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <Link style={{ textDecoration: 'none' }} to="/users">
                <Emoji text=":busts_in_silhouette:" /> users
              </Link>
            </motion.h1>
            <motion.h1
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <Link style={{ textDecoration: 'none' }} to="/orders">
                <Emoji text="&#128450;&#65039;" /> orders
              </Link>
            </motion.h1>
          </div>
        </motion.div>
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
