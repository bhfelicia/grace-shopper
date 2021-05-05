import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../store/thunks/categoryThunk';
import { destroyCategory } from '../../store/thunks/categoryThunk';

import axios from 'axios';

class AllCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: {
        fullName: '',
        id: 0,
        isAdmin: false,
        role: '',
        first: '',
        last: '',
        password: '',
        email: '',
        createdAt: '',
        updatedAt: '',
      },
    };
    this.deleteCategoryHandler = this.deleteCategoryHandler.bind(this);
  }

  async componentDidMount() {
    this.props.getCategories();
    const { data: loggedInUser } = await axios.get('/api/auth', {
      headers: { authorization: window.localStorage.getItem('token') },
    });
    this.setState({ loggedInUser });
  }

  deleteCategoryHandler(categoryToDelete) {
    this.props.deleteCategory(categoryToDelete);
  }

  render() {
    const { categories } = this.props.categoryReducer;
    return (
      <div>
        <Link to={'/createCategory'}>Add Category</Link>
        <div id="all-categories">
          {categories.map((category) => {
            if (this.state.loggedInUser.isAdmin) {
              return (
                <div key={category.id}>
                  <Link
                    to={`/categories/${category.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <h2>{category.name}</h2>
                  </Link>
                  <div>
                    <button
                      onClick={() => this.deleteCategoryHandler(category)}
                      value={category}
                    >
                      delete
                    </button>
                    <Link to={`/categories/${category.id}/edit`}>edit</Link>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={category.id}>
                  <Link
                    to={`/categories/${category.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <h2>{category.name}</h2>
                  </Link>
                </div>
              );
            }
          })}
        </div>
      </div>
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
