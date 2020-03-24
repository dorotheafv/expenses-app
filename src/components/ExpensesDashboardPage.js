import React from 'react';
import ConnectedExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const ExpensesDashboardPage = () => (
    <div>
        <ExpenseListFilters />
        <ConnectedExpenseList />
    </div>
);

export default ExpensesDashboardPage;