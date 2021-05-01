import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Nav = () => {
  if (window.localStorage.role === 'GUEST' || !window.localStorage.role) {
    return (
      <nav className="nav-container">
        <Link style={{ textDecoration: 'none' }} to="/">
          Home
        </Link>
        <SearchBar />
        <div>
          <Link style={{ textDecoration: 'none' }} to="/login">
            Login |
          </Link>
          <Link style={{ textDecoration: 'none' }} to="/signup">
            {' '}
            Sign Up
          </Link>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="nav-container">
        <Link style={{ textDecoration: 'none' }} to="/">
          Home
        </Link>
        <SearchBar />
        <div>
          <Link style={{ textDecoration: 'none' }} to="/orders">
            Orders |
          </Link>
          <Link style={{ textDecoration: 'none' }} to="/cart">
            Cart |
          </Link>
          <Link style={{ textDecoration: 'none' }} to="/login">
            Logout
          </Link>
        </div>
      </nav>
    );
  }
};

export default connect((state) => state)(Nav);
