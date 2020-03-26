import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import {getExpensesTotalAmount } from '../selectors/expenses-total';

export const ExpensesSummary = (props) => {
    const expenseWord = props.expensesCount == 1 ?"expense" :"expenses" ;
    const formattedAmount = numeral(props.expensesAmount).format('$0,0.00');
    return(  <div>
        <p>
            You have <b>{props.expensesCount}</b> {expenseWord} and their total is: <b>{formattedAmount}</b>
        </p>
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
