import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Nav = () => {
  return (
    <nav className="nav-container">
      <Link style={{ textDecoration: "none" }} to="/">
        Home
      </Link>
      <SearchBar />
      <div>
        <Link style={{ textDecoration: "none" }} to="/LoginPage">
          Login |
        </Link>
        <Link style={{ textDecoration: "none" }} to="/SignUpPage">
          {" "}
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default connect((state) => state)(Nav);
