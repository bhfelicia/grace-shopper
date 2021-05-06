import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../../store/thunks/userThunk';

import { motion } from 'framer-motion';
import Emoji from 'react-emoji-render';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      password: '',
      email: '',
      role: '',
      message: 'sign up below',
      isCreated: false,
    };
    this.userDetailsHandler = this.userDetailsHandler.bind(this);
    this.createUserHandler = this.createUserHandler.bind(this);
    this.displayForm = this.displayForm.bind(this);
  }

  userDetailsHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  createUserHandler(event) {
    event.preventDefault();
    const newUser = { ...this.state };
    this.props.createUser(newUser);
    this.setState({
      message:
        'Thank you your account has been created, you can now log in with your credentials!',
      isCreated: true,
    });
  }

  displayForm() {
    return (
      <div>
        <form onSubmit={this.createUserHandler}>
          <div>
            <input
              type="text"
              value={this.state.first}
              name="first"
              onChange={this.userDetailsHandler}
              required
              placeholder="first"
            />
            <input
              type="text"
              value={this.state.last}
              name="last"
              onChange={this.userDetailsHandler}
              required
              placeholder="last"
            />
          </div>
          <div>
            <input
              type="text"
              value={this.state.email}
              name="email"
              onChange={this.userDetailsHandler}
              required
              placeholder="email"
            />
            <input
              type="password"
              value={this.state.password}
              name="password"
              onChange={this.userDetailsHandler}
              required
              placeholder="password"
            />
          </div>
          <br></br>
          <button type="submit">create</button>
        </form>
      </div>
    );
  }

  render() {
    return (
      <motion.div
        transition={{ ease: 'easeOut', duration: 1 }}
        initial={{ opacity: 0 }}
        animate={{ x: [100, 0], opacity: 1 }}
      >
        {this.state.message}
        <br></br>
        {this.state.isCreated ? null : this.displayForm()}
      </motion.div>
    );
  }
}

//WHEN CREATING A USER HOW CAN WE WE CHOOSE THE ROLE WE WANT TO GIVE THEM
//AUTHENTICATED VS GUEST???

const mapStateToProps = ({ userReducer }) => ({
  userReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(addUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
