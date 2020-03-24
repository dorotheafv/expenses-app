import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFoundPage from './../components/NotFoundPage';
import EditExpensesPage from './../components/EditExpensesPage';
import HelpExpensesPage from './../components/HelpExpensesPage';
import AddExpensesPage from './../components/AddExpensesPage';
import Header from './../components/Header';
import ExpensesDashboardPage from './../components/ExpensesDashboardPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" exact={true} component={ExpensesDashboardPage} />
                <Route path="/create" component={AddExpensesPage} />
                <Route path="/help" component={HelpExpensesPage} />
                <Route path="/edit/" exact={true} component={EditExpensesPage} />

                <Route path="/edit/:id" component={EditExpensesPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>

    </BrowserRouter>
);

export default AppRouter;