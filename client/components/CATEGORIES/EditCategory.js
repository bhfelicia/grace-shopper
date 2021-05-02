import React, {Component}from 'react';
import {connect} from 'react-redux';
import {updateCategory}  from '../../store/thunks/categoryThunk';
import { fetchCategories, fetchCategory } from '../../store/thunks/categoryThunk';


class EditCategory extends Component{
    constructor(props){
        super(props);
        this.state ={
            id: Number(this.props.match.params.id) || "",
            name : this.props.categoryReducer.selectedCategory.name || "",
        }
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onChange(ev){
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }

    componentDidMount(){
        this.props.getCategories();
        this.props.getCategory(Number(this.props.match.params.id));
        const id = Number(this.props.match.params.id)
        const { name} = this.props.categoryReducer.selectedCategory;
        this.setState({
            id,
            name
        })
        console.log(this.state, 'STATE in component di mount')
    }

    onSave(ev){
        ev.preventDefault();
        const editedCategory = { ...this.state };
        console.log(editedCategory, 'AWEEEEWEWEEWEWEEW')
        console.log(this.props, 'herrererrerererrerer')
        //console.log(this.props.categoryReducer.selectedCategory.id, 'AWEEEEWEWEEWEWEEW')
        this.props.editCategory(editedCategory)

    }

    render(){
        console.log(this.props, "rendererrer")
        return(
            <form onSubmit={this.onSave}>
                <div>
                    <label> name Category</label>
                    <input type='text' name='name' value={this.state.name} onChange={this.onChange}/>
                    <button>save</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = ({ categoryReducer }) => ({
    categoryReducer,
  });
const mapDispatchToProps = (dispatch) =>({
    getCategories: ()=> dispatch(fetchCategories()),
    getCategory: (id) => dispatch(fetchCategory(id)),
    editCategory: (id) => dispatch(updateCategory(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);