import React from 'react';
import {connect} from 'react-redux';
import SignUpForm from '../FORMS/SignUpForm'

const signUpPage = ()=>{
    return(< SignUpForm/>)
}

export default connect(state => state)(signUpPage)