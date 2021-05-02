import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


const Header = ()=>{
    return (
    <div>
        <Link to='/categories' style={{ textDecoration: "none" }} className='btnCat'>All Categories</Link>
    </div>)
}

export default connect(state=>state)(Header);