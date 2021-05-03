import React from 'react';
import { connect } from 'react-redux';
import CreateUser from '../USERS/CreateUser';

const SignUp = () => {
  return (
    <div>
      <CreateUser/>
    </div>
  );
};

export default connect((state) => state)(SignUp);
