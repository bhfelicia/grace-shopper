import React, { Component } from "react";
import { connect } from "react-redux";
import { addCategory } from "../../store/thunks/categoryThunk";

import { motion } from "framer-motion";

class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onSave(ev) {
    ev.preventDefault();

    this.props.createCategory(this.state);
  }

  render() {
    const { name } = this.state;
    const { onChange, onSave } = this;
    return (
      <form onSubmit={onSave}>
        <motion.div
          transition={{ ease: "easeOut", duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ x: [100, 0], opacity: 1 }}
        >
          <h2>new category</h2>
          <div>
            <input
              name="name"
              value={name}
              onChange={onChange}
              placeholder="name"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              save
            </motion.button>
          </div>
        </motion.div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createCategory: (category) => dispatch(addCategory(category, history)),
  };
};
export default connect(null, mapDispatchToProps)(CreateCategory);
