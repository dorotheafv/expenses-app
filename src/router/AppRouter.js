import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import NotFoundPage from './../components/NotFoundPage';
import EditExpensesPage from './../components/EditExpensesPage';
import HelpExpensesPage from './../components/HelpExpensesPage';
import AddExpensesPage from './../components/AddExpensesPage';
import ExpensesDashboardPage from './../components/ExpensesDashboardPage';
import LoginPage from '../components/LoginPage';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
//create our own history
export const history = createHistory();

const AppRouter = () => (
    <Router history={history}> 
        <div>
            <Switch>
                <PublicRoute path="/" exact={true} component={LoginPage} />
                <PrivateRoute path="/dashboard" exact={true} component={ExpensesDashboardPage} />
                <PrivateRoute path="/create" component={AddExpensesPage} />
                <PrivateRoute path="/help" component={HelpExpensesPage} />
                <PrivateRoute path="/edit/" exact={true} component={EditExpensesPage} />
                <PrivateRoute path="/edit/:id" component={EditExpensesPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;