import React from 'react';
import {connect} from 'react-redux';
import LoginForm from '../FORMS/LoginForm';


const loginPage = ()=>{
    return(< LoginForm/>)
}

export  default connect(state => state)(loginPage);