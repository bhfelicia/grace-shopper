import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchUser } from "../../store/thunks/userThunk";

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
      </div>
    );
  }

  render() {
    return <div>{this.displayUser()}</div>;
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
