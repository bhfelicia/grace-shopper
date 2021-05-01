import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, updateUser } from "../../store/thunks/userThunk";

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
    };

    this.editUserHandler = this.editUserHandler.bind(this);
    this.submitUpdateHandler = this.submitUpdateHandler.bind(this);
  }

  componentDidMount() {
    console.log(this.props, "COMPONENT DID MOUNT");

    this.props.getUser(Number(this.props.match.params.id));
    const {
      first,
      last,
      id,
      password,
      email,
    } = this.props.userReducer.selectedUser;
    this.setState({ id, first, last, password, email });
  }

  componentDidUpdate(prevProps) {
    // if (!prevProps.selectedUser.id && this.props.selectedUser.id) {
    //   const { first, last, id, password, email } = this.props.selectedUser;
    //   this.setState({ id, first, last, password, email });
    // }
  }

  editUserHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submitUpdateHandler(event) {
    event.preventDefault();
    const editedUser = { ...this.state };
    // editedUser.id = this.props.userReducer.selectedUser.id; //I AM USING THIS BECAUSE FOR SOME REASON THE STATE ISN'T UPDATED MY DEFAULT PARAMETERS ZZZZ
    console.log("Hello from submit handler", this.props);
    console.log(editedUser);
    this.props.editUser(editedUser);
  }

  render() {
    console.log(
      this.props,
      "HERE MY DUDE WHY ARE THESE PROPS LOADING 4 TIMES DF?"
    );
    if (!!window.localStorage.isAdmin && window.localStorage.role !== "GUEST") {
      return (
        <div>
          <form onSubmit={this.submitUpdateHandler}>
            <h4>Edit User</h4>
            <label>First Name </label>
            <input
              type="text"
              value={this.state.first}
              name="first"
              onChange={this.editUserHandler}
              required
            />
            <br></br>
            <label>Last Name </label>
            <input
              type="text"
              value={this.state.last}
              name="last"
              onChange={this.editUserHandler}
              required
            />
            <br></br>
            <label>Password </label>
            <input
              type="text"
              value={this.state.password}
              name="password"
              onChange={this.editUserHandler}
              required
            />
            <br></br>
            <label>Email </label>
            <input
              type="text"
              value={this.state.email}
              name="email"
              onChange={this.editUserHandler}
              required
            />
            <br></br>
            <button type="submit">Update</button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <img src="https://media3.giphy.com/media/8abAbOrQ9rvLG/200.gif" />
        </div>
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
