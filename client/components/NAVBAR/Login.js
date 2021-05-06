import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { loadUser } from '../../store/actionCreators/userActionCreators';
import GitHubIcon from '@material-ui/icons/GitHub';

import { motion } from 'framer-motion';
import Emoji from 'react-emoji-render';

// window.GITHUB_CLIENT_ID = "<%= GITHUB_CLIENT_ID %>";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      auth: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.signIn = this.signIn.bind(this);
    this.logout = this.logout.bind(this);
    this.attemptTokenLogin = this.attemptTokenLogin.bind(this);
  }
  componentDidMount() {
    //this.attemptTokenLogin();
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSubmit(ev) {
    ev.preventDefault();
    const { email, password } = this.state;
    this.signIn({
      email,
      password,
    });
  }
  async signIn(credentials) {
    let response = await axios.post('/api/auth', credentials);
    const { token } = response.data;
    window.localStorage.setItem('token', token);
    this.attemptTokenLogin();
  }
  logout() {
    window.localStorage.removeItem('token');
    window.localStorage.setItem('guest', 'true');
    this.setState({ auth: {} });
    this.props.authorizeUser({});
  }
  async attemptTokenLogin() {
    const token = window.localStorage.getItem('token');
    if (token) {
      const response = await axios.get('/api/auth', {
        headers: {
          authorization: token,
        },
      });
      this.setState({ auth: response.data });
      this.props.authorizeUser(this.state.auth);
      this.setState({ email: '', password: '', auth: {} });
      window.localStorage.setItem('guest', 'false');
      this.props.history.push('/');
      location.reload();
    }
  }
  render() {
    const { onChange, onSubmit, logout } = this;
    const { email, password, auth } = this.state;
    if (!auth.id) {
      return (
        <motion.div
          className="login-container"
          transition={{ ease: 'easeOut', duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ x: [100, 0], opacity: 1 }}
        >
          <form onSubmit={onSubmit} className="login-form">
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                value={email}
                onChange={onChange}
                name="email"
                placeholder="email@example.com"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={onChange}
                name="password"
                placeholder="password"
              />
            </div>
            <motion.div
              className="form-group"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <button type="submit" className="form-button">
                sign in
              </button>
            </motion.div>
            <hr></hr>
            <div id="signupOptions">
              <div>
                <motion.h1
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: [0.9, 1.05] }}
                >
                  <a href={`/api/auth/oauth`}>
                    {<GitHubIcon style={{ fontSize: 40, color: 'black' }} />}
                  </a>
                </motion.h1>
              </div>
              <div>
                <motion.h1
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: [0.9, 1.05] }}
                >
                  <Link style={{ textDecoration: 'none' }} to="/signup">
                    <Emoji text=":writing_hand:" />
                  </Link>
                </motion.h1>
              </div>
            </div>
          </form>
        </motion.div>
      );
    } else {
      return (
        <div>
          Welcome {auth.username}
          <button onClick={logout}>Logout</button>
        </div>
      );
    }
  }
}

export default connect(
  ({ userReducer }) => {
    return { userReducer };
  },
  (dispatch) => {
    return {
      authorizeUser: (user) => dispatch(loadUser(user)),
    };
  }
)(Login);
