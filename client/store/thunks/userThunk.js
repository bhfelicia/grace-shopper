import axios from 'axios';
import store from '../store'
import actions from '../actions'
import {editUser, deleteUser, loadUsers, loadUser, createUser} from '../actionCreators/userActionCreators';

const fetchUsers = ()=>{
    return async (dispatch) => {
        const response = await axios.get('/api/users');
        const users = response.data;
        dispatch (loadUsers(users));
    }
}


export {fetchUsers}
