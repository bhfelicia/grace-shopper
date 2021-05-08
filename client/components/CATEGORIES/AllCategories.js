import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../store/thunks/categoryThunk";
import { destroyCategory } from "../../store/thunks/categoryThunk";

import axios from "axios";

import { motion } from "framer-motion";
import Emoji from "react-emoji-render";

class AllCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: {
        fullName: "",
        id: 0,
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
    this.deleteCategoryHandler = this.deleteCategoryHandler.bind(this);
  }

  async componentDidMount() {
    this.props.getCategories();
    const { data: loggedInUser } = await axios.get("/api/auth", {
      headers: { authorization: window.localStorage.getItem("token") },
    });
    this.setState({ loggedInUser });
  }

  deleteCategoryHandler(categoryToDelete) {
    this.props.deleteCategory(categoryToDelete);
  }

  render() {
    const { categories } = this.props.categoryReducer;
    let showAddCategory = null;
    if (this.state.loggedInUser.isAdmin) {
      showAddCategory = (
        <motion.button
          transition={{ ease: "easeOut", duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ x: [100, 0], opacity: 1 }}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: [0.9, 1.05] }}
        >
          <Link to={"/createCategory"}>add</Link>
        </motion.button>
      );
    }
    return (
      <motion.div>
        {/* <Link to={"/createCategory"}>Add Category</Link> */}
        {showAddCategory}
        <div id="all-categories">
          {categories.map((category) => {
            if (this.state.loggedInUser.isAdmin) {
              return (
                <motion.div key={category.id}>
                  <motion.div
                    transition={{ ease: "easeOut", duration: 1 }}
                    initial={{ opacity: 0 }}
                    animate={{ x: [-100, 0], opacity: 1 }}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: [0.9, 1.05] }}
                  >
                    <Link
                      to={`/categories/${category.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <h2>{category.name}</h2>
                    </Link>
                  </motion.div>

                  <motion.button
                    transition={{ ease: "easeOut", duration: 1 }}
                    initial={{ opacity: 0 }}
                    animate={{ x: [100, 0], opacity: 1 }}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: [0.9, 1.05] }}
                  >
                    <Link to={`/categories/${category.id}/edit`}>edit</Link>
                  </motion.button>

                  <motion.button
                    transition={{ ease: "easeOut", duration: 1 }}
                    initial={{ opacity: 0 }}
                    animate={{ x: [100, 0], opacity: 1 }}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: [0.9, 1.05] }}
                    onClick={() => this.deleteCategoryHandler(category)}
                    value={category}
                  >
                    delete
                  </motion.button>
                </motion.div>
              );
            } else {
              return (
                <div key={category.id}>
                  <motion.div
                    transition={{ ease: "easeOut", duration: 1 }}
                    initial={{ opacity: 0 }}
                    animate={{ x: [100, 0], opacity: 1 }}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: [0.9, 1.05] }}
                  >
                    <Link
                      to={`/categories/${category.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <h2>{category.name}</h2>
                    </Link>
                  </motion.div>
                </div>
              );
            }
          })}
        </div>
      </motion.div>
    );
  }
}

const mapStateToProps = ({ categoryReducer, userReducer }) => ({
  categoryReducer,
  userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(fetchCategories()),
  deleteCategory: (category) => dispatch(destroyCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories);
