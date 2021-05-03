import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { fetchUsers } from "../../store/thunks/userThunk";



class Nav extends Component {
  constructor(){
    super();
    this.logout = this.logout.bind(this);
  }


  componentDidMount() {
    this.props.getUsers();
  }

  logout() {
    window.localStorage.clear();
  }

  render(){
    if (this.props.userReducer.selectedUser.isAdmin ) {
      return (
        <nav className="nav-container">
          <Link style={{ textDecoration: "none" }} to="/">
            Home
          </Link>
          <SearchBar />
          <div>
            <Link style={{ textDecoration: "none" }} to="/settings">
              Settings |
            </Link>
            <Link style={{ textDecoration: "none" }} to="/" onClick={()=>this.logout()}>
              &nbsp;Logout
            </Link>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="nav-container">
          <Link style={{ textDecoration: "none" }} to="/">
            Home
          </Link>
          <SearchBar />
          <div>
            <Link style={{ textDecoration: "none" }} to="/login">
              Login |
            </Link>
            <Link style={{ textDecoration: "none" }} to="/signup">
              {" "}
              Sign Up
            </Link>
          </div>
        </nav>
      );
    }
  }
};
const mapStateToProps = ({ userReducer }) => ({
  userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(fetchUsers()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
