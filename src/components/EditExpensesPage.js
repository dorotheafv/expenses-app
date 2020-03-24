import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux'; 
import { addExpense, removeExpense , editExpense} from '../actions/expenses';

export class EditExpensesPage extends React.Component{
    onSubmit=(expense) => {
        if (expense && expense.id)
           this.props.editExpense(expense);
        else
            this.props.addExpense(expense);
        this.props.history.push("/");

    };

    onRemove = () => {
        this.props.removeExpense({id:this.props.expense.id} );
        this.props.history.push("/");
    };

    render (){
        return ( 
            <div>
            <ExpenseForm
                expense={this.props.expense}
                onSubmit={this.onSubmit} />
            {(this.props.expense && this.props.expense.id) &&
                <button onClick={this.onRemove}>Remove</button>
            }
        </div>
        );
    };
}
  
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id
        })
    };
};

const mapDispatchToProps = (dispatch) => {
    return { 
        editExpense: (expense) => dispatch(editExpense(expense.id, expense)),
        addExpense: (expense) => dispatch(addExpense(expense)),
        removeExpense: (id) => dispatch(removeExpense( id ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensesPage);