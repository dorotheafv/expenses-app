import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import { getExpensesTotalAmount } from '../selectors/expenses-total';
import { Link } from 'react-router-dom';

export const ExpensesSummary = (props) => {
    const expenseWord = props.expensesCount == 1 ? "expense" : "expenses";
    const formattedAmount = numeral(props.expensesAmount).format('$0,0.00');
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">  You have <span>{props.expensesCount}</span> {expenseWord} and their total is: <span>{formattedAmount}</span>
                </h1>
                <div className="page-header__actions">

                    <Link to="/create" className="btn">Add expense</Link>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expensesCount: visibleExpenses.length,
        expensesAmount: getExpensesTotalAmount(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);
