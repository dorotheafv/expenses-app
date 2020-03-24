import React from 'react';
import { NavLink } from 'react-router-dom';


const Header = () => (
    <header>
        <h1>Expensify</h1>
        <div>
            <NavLink to="/" exact={true} activeClassName="is-active">ExpensesDashboardPage</NavLink>
        </div>
        <div>
            <NavLink to="/create" activeClassName="is-active">Create</NavLink>
        </div>
        <div>
            <NavLink to="/edit" activeClassName="is-active">Edit</NavLink>
        </div>
        <div>
            <NavLink to="/help" activeClassName="is-active">Help</NavLink>
        </div>

    </header>
);

export default Header;