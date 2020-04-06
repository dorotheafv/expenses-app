import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { connect } from 'react-redux';

export const Header = ({ startLogout }) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link to="/dashboard" className="header">
                    <h1 className="header__title">Expenses App</h1>
                </Link>
                {/**         <div>
                <NavLink to="/dashboard">ExpensesDashboardPage</NavLink>
            </div>
            <div>
                <NavLink to="/create" activeClassName="is-active">Add</NavLink>
            </div>
            <div>
                <NavLink to="/edit" activeClassName="is-active">Edit</NavLink>
            </div>
            <div>
                <NavLink to="/help" activeClassName="is-active">Help</NavLink>
    </div> */}
                <button className="btn btn--link" onClick={startLogout}>Logout</button>
            </div>
        </div>

    </header>
);

const mapDispatchToProps = (dispatch) => {
    return {
        startLogout: () => dispatch(startLogout())
    }
};

export default connect(undefined, mapDispatchToProps)(Header);