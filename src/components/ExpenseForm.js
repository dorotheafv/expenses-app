import React from 'react';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';//css  for datepicker provided from the libary
import moment from 'moment';

const now = moment();
console.log(now.format('MMM Do, YYYY'));

class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: '',
            btnAction: props.expense ? 'Update Expense' : 'Add Expense'

        }
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));

        }

    }

    onAddExpense = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please provide description and amount' }));
        } else {
            this.setState(() => ({ error: '' }));

            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }


    }

    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    }

    render() {
        return (
            <form className="form" onSubmit={this.onAddExpense}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input className="text-input" type="text" placeholder="Description" autoFocus value={this.state.description}
                    onChange={this.onDescriptionChange} />
                <input className="text-input" type="text" placeholder="Amount" value={this.state.amount} onChange={this.onAmountChange} />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />

                <textarea className="textarea" onChange={this.onNoteChange} placeholder="Add a note for your expense (optional)!" />

                <div className="btn-container">
                    <button className="btn" type="submit">{this.state.btnAction}</button>  
                </div>
            </form>

        )
    }
}

export default ExpenseForm;
