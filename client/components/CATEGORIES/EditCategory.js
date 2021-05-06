import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCategory } from '../../store/thunks/categoryThunk';
import {
  fetchCategories,
  fetchCategory,
} from '../../store/thunks/categoryThunk';

import { motion } from 'framer-motion';

class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Number(this.props.match.params.id) || '',
      name: this.props.categoryReducer.selectedCategory.name || '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getCategory(Number(this.props.match.params.id));
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ ...this.props.categoryReducer.selectedCategory });
    }
  }

  onSave(ev) {
    ev.preventDefault();
    const editedCategory = { ...this.state };
    this.props.editCategory(editedCategory);
  }

  render() {
    let selectedCategoryName = this.props.categoryReducer.selectedCategory.name;
    return (
      <form onSubmit={this.onSave}>
        <motion.div
          transition={{ ease: 'easeOut', duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ x: [100, 0], opacity: 1 }}
        >
          <h2>{selectedCategoryName}</h2>
          <div>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="new name"
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

const mapStateToProps = ({ categoryReducer }) => ({
  categoryReducer,
});
const mapDispatchToProps = (dispatch, { history }) => ({
  getCategories: () => dispatch(fetchCategories()),
  getCategory: (id) => dispatch(fetchCategory(id)),
  editCategory: (category) => dispatch(updateCategory(category, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
