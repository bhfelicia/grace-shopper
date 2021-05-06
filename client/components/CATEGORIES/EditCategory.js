import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCategory } from "../../store/thunks/categoryThunk";
import {
  fetchCategories,
  fetchCategory,
} from "../../store/thunks/categoryThunk";

class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Number(this.props.match.params.id) || "",
      name: this.props.categoryReducer.selectedCategory.name || "",
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
        <div>
          <p>{selectedCategoryName}</p>
          <label> Update Category Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
          />
          <button>save</button>
        </div>
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
