import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../store/thunks/userThunk';

class Settings extends Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.props.getUsers();
        // console.log(this.props.userReducer.selectedUser, ' component di mount' )
    }
    
    logout() {
        window.localStorage.clear();
    }

    render(){
        const fullName = this.props.userReducer.selectedUser.first +' '+ this.props.userReducer.selectedUser.last;
        return (
        <div className='settings-container'>
            <div className='settings-container-right'>
                <Link style={{ textDecoration: "none" }} to="/products" >
                    AllProducts
                </Link> 
                <Link style={{ textDecoration: "none" }} to="/users" >
                    AllUsers
                </Link> 
                <Link style={{ textDecoration: "none" }} to="/orders" >
                    AllOrders
                </Link> 
            </div>
            <div className='settings-container-left'>
                Welcome {fullName}
                <Link style={{ textDecoration: "none" }} to="/" onClick={()=>this.logout()}>
                Logout
                </Link> 
            </div>
        </div>)
    }
}
const mapState = ({userReducer})=> ({
    userReducer,
});

const mapDispatch = (dispatch) => ({
    getUsers: () => dispatch(fetchUsers())
});

export default connect(mapState, mapDispatch)(Settings);