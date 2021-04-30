import React from 'react';
import { connect } from 'react-redux';

const SignUp = () => {
  return (
    <div>
      {' '}
      here the sign up page. just have to link to the userCreate component{' '}
    </div>
  );
};

export default connect((state) => state)(SignUp);
