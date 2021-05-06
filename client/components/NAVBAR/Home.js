import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AllProducts from "../PRODUCTS/AllProducts";

const Home = () => {
  return <AllProducts />;
};

export default connect((state) => state)(Home);
