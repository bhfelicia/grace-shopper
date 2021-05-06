import React, { Component } from "react";
import { connect } from "react-redux";
import { addCategory } from "../../store/thunks/categoryThunk";

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

  async onSave(ev) {
    ev.preventDefault();
    try {
      await this.props.createCategory(this.state);
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    const { name } = this.state;
    const { onChange, onSave } = this;
    return (
      <form onSubmit={onSave}>
        <label>new category </label>
        <input name="name" value={name} onChange={onChange} />
        <button> save </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createCategory: (category) => dispatch(addCategory(category, { history })),
  };
};
export default connect(null, mapDispatchToProps)(CreateCategory);
