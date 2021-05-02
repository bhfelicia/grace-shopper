import React, { Component } from "react";
import { connect } from "react-redux";
import EditUser from "./EditUser";

import { fetchUser } from "../../store/thunks/userThunk";
import { Link } from "react-router-dom";

class SingleUser extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getUser(Number(this.props.match.params.id));
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
    let isValid = null;
    console.log(this.props.userReducer.selectedUser, "user reducer selected");
    if (this.props.userReducer.selectedUser.isAdmin) {
      isValid = this.displayUser();
    }
    // if (window.localStorage.isAdmin && window.localStorage.role !== "GUEST") {
    //   isValid = this.displayUser();
    // }
    return <div>{isValid}</div>;
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
