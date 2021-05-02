import React, {Component} from 'react';
import {connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { fetchCategories } from '../../store/thunks/categoryThunk';
import {destroyCategory} from '../../store/thunks/categoryThunk';


class AllCategories extends Component{
    constructor(){
        super();
        this.deleteCategoryHandler = this.deleteCategoryHandler.bind(this);
    }

    componentDidMount(){
        this.props.getCategories();
    }

    deleteCategoryHandler(categoryToDelete){
        this.props.deleteCategory(categoryToDelete);
    }

    render(){
        const {categories} = this.props.categoryReducer;
        return(
            <div id="all-categories">
                  <Link to={'/createCategory'}>Add Category</Link>
                {
                    categories.map((category) =>{
                        if (window.localStorage.role === "GUEST" || !window.localStorage.role) {
                            return(
                                <div key={category.id}>
                                    <Link to={`/categories/${category.id}`} style={{ textDecoration: "none" }}> 
                                        <h2>{category.name}</h2>
                                    </Link> 
                                    <div>
                                            <button onClick={() => this.deleteCategoryHandler(category)} value={category}>delete</button>
                                            <Link  to={`/categories/${category.id}/edit`}>edit</Link>
                                        </div>
                                </div>
                                
                            )
                    
                        }else{
                            return(
                                <div>
                                    <div key={category.id}>
                                        <Link to={`/categories/${category.id}`} style={{ textDecoration: "none" }}> 
                                            <h2>{category.name}</h2>
                                        </Link> 
                                        <div>
                                            <button onClick={() => this.deleteCategoryHandler(category)} value={category}>delete</button>
                                            <Link  to={`/categories/${category.id}/edit`}>edit</Link>
                                        </div>
                                    </div>
                                    <Link to={'/createCategory'}>Add Category</Link>
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}

 const mapStateToProps = ({categoryReducer}) =>({
     categoryReducer
 });

const mapDispatchToProps = (dispatch) =>({
getCategories: ()=> dispatch(fetchCategories()),
deleteCategory: (category) => dispatch(destroyCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories)