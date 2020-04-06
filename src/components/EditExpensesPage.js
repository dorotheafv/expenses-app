import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense, startRemoveExpense, startUpdateExpense } from '../actions/expenses';

export class EditExpensesPage extends React.Component {
    onSubmit = (expense) => {
        if (this.props.expense) {
            this.props.startUpdateExpense(this.props.expense.id, expense);
        } else {
            this.props.startAddExpense(expense);
        }
        this.props.history.push("/dashboard");

    };

    onRemove = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push("/dashboard");
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>

                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        expense={this.props.expense}
                        onSubmit={this.onSubmit} />
                    {this.props.expense &&
                        <button className="btn btn--link__secondary" onClick={this.onRemove}>Remove expense</button>
                    }
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id;
        })
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        startAddExpense: (expense) => dispatch(startAddExpense(expense)),
        startUpdateExpense: (id, expense) => dispatch(startUpdateExpense(id, expense)),
        startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensesPage);