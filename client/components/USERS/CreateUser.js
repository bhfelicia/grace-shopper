import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser } from "../../store/thunks/userThunk";
class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: "",
      last: "",
      password: "",
      email: "",
      role: "",
      message: "Please Enter Proper Credentials",
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
        "Thank you your account has been created, you can now log in with your credentials!",
      isCreated: true,
    });
  }

  displayForm() {
    return (
      <div>
        <form onSubmit={this.createUserHandler}>
          <h4>Create User</h4>
          <label>First Name </label>
          <input
            type="text"
            value={this.state.first}
            name="first"
            onChange={this.userDetailsHandler}
            required
          />
          <br></br>
          <label>Last Name </label>
          <input
            type="text"
            value={this.state.last}
            name="last"
            onChange={this.userDetailsHandler}
            required
          />
          <br></br>
          <label>Password </label>
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.userDetailsHandler}
            required
          />
          <br></br>
          <label>Email </label>
          <input
            type="text"
            value={this.state.email}
            name="email"
            onChange={this.userDetailsHandler}
            required
          />
          <br></br>
          <button type="submit">CREATE</button>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.message}
        <br></br>
        {this.state.isCreated ? null : this.displayForm()}
      </div>
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
