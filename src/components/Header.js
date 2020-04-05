import React from 'react';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { connect } from 'react-redux';

export const Header = ({startLogout}) => (
    <header>
        <h1>Expensify</h1>
        <div>
            <NavLink to="/dashboard" exact={true} activeClassName="is-active">ExpensesDashboardPage</NavLink>
        </div>
        <div>
            <NavLink to="/create" activeClassName="is-active">Add</NavLink>
        </div>
        <div>
            <NavLink to="/edit" activeClassName="is-active">Edit</NavLink>
        </div>
        <div>
            <NavLink to="/help" activeClassName="is-active">Help</NavLink>
        </div>
        <button onClick={startLogout}>Logout</button>
    </header>
);

const mapDispatchToProps = (dispatch) => {
    return { 
        startLogout: () => dispatch(startLogout())
    }
};

export default connect(undefined, mapDispatchToProps)(Header);