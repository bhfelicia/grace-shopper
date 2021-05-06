import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { fetchUsers } from "../../store/thunks/userThunk";

import { motion } from "framer-motion";
import Emoji from "react-emoji-render";

import axios from "axios";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      loggedInUser: {
        fullName: "",
        id: 1,
        isAdmin: false,
        role: "",
        first: "",
        last: "",
        password: "",
        email: "",
        createdAt: "",
        updatedAt: "",
      },
    };
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    this.props.getUsers();
    if (window.localStorage.getItem("guest") === "true") {
      let response = await axios.post("/api/auth", {
        email: "guest@guest.com",
        password: "guest_pw",
      });
      const { token } = response.data;
      window.localStorage.setItem("token", token);
    } else {
      const { data: loggedInUser } = await axios.get("/api/auth", {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      this.setState({ loggedInUser });
    }
  }

  async logout() {
    const guestUser = await axios.get("/api/users/1");
    window.localStorage.setItem("token", guestUser.data.password);
    window.localStorage.setItem("guest", "true");
    this.props.history.push("/");
  }

  render() {
    if (this.state.loggedInUser.isAdmin) {
      return (
        <nav className="nav-container">
          <Link style={{ textDecoration: "none" }} to="/">
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <Emoji text=":house:" />
            </motion.div>
          </Link>
          <SearchBar />
          <div className="rightNavbar">
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <Link style={{ textDecoration: "none" }} to="/categories">
                <Emoji text=":cat:" />
              </Link>
            </motion.div>
            <Link style={{ textDecoration: "none" }} to="/settings">
              <motion.div
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: [0.9, 1.05] }}
              >
                <Emoji text="&#128736;&#65039;" />
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <Link style={{ textDecoration: "none" }} to="/cart">
                <Emoji text=":shopping_cart:" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <Link
                style={{ textDecoration: "none" }}
                onClick={() => {
                  this.logout();
                  this.setState({ loggedInUser: {} });
                }}
                to="/login"
              >
                <Emoji text=":v:" />
              </Link>
            </motion.div>
          </div>
        </nav>
      );
    } else if (
      this.state.loggedInUser.isAdmin === false &&
      this.state.loggedInUser.role === "AUTHENTICATED"
    ) {
      return (
        <nav className="nav-container">
          <Link style={{ textDecoration: "none" }} to="/">
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <Emoji text=":house:" />
            </motion.div>
          </Link>
          <SearchBar />
          <div className="rightNavbar">
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <Link style={{ textDecoration: "none" }} to="/categories">
                <Emoji text=":cat:" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <Link style={{ textDecoration: "none" }} to="/cart">
                <Emoji text=":shopping_cart:" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <Link
                style={{ textDecoration: "none" }}
                onClick={() => {
                  this.logout();
                  this.setState({ loggedInUser: {} });
                }}
                to="/login"
              >
                &nbsp;Logout
              </Link>
            </motion.div>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="nav-container">
          <Link style={{ textDecoration: "none" }} to="/">
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <Emoji text=":house:" />
            </motion.div>
          </Link>
          <SearchBar />
          <div className="rightNavbar">
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <Link style={{ textDecoration: "none" }} to="/categories">
                <Emoji text=":cat:" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <Link style={{ textDecoration: "none" }} to="/cart">
                <Emoji text=":shopping_cart:" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <Link style={{ textDecoration: "none" }} to="/login">
                <Emoji text=":key:" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <Link style={{ textDecoration: "none" }} to="/signup">
                <Emoji text=":writing_hand:" />
              </Link>
            </motion.div>
          </div>
        </nav>
      );
    }
  }
}

const mapStateToProps = ({ userReducer }) => ({
  userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(fetchUsers()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
