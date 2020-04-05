import React from 'react';
// import { Button } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({startLogin}) =>
(
    <div>
        <p>Login to manage your expenses!</p>
        <button onClick={startLogin}>Login</button>
    </div>
);



const mapDispatchToProps = (dispatch) => {
   return  {
       startLogin: () => dispatch(startLogin())
    }
};
export default connect(undefined, mapDispatchToProps)(LoginPage);