import React from 'react';
// import { Button } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({startLogin}) =>
(
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expenses App</h1>
            <p>Login to manage your expenses!</p>
            <button className="btn" onClick={startLogin}>Login with Google</button>
        </div>
    </div>
);



const mapDispatchToProps = (dispatch) => {
   return  {
       startLogin: () => dispatch(startLogin())
    }
};
export default connect(undefined, mapDispatchToProps)(LoginPage);