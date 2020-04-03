import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
//css  for datepicker provided from the libary
// import 'react-dates/lib/css/_datepicker.css';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {

    state = {
        calendarFocused: null
    };
    onDatesChange = ({ startDate, endDate }) => {
        this.props.setEndDate(endDate);
        this.props.setStartDate(startDate);
    };

    onFocusChange = (calendarFocused) => {
        this.setState(() => ( {calendarFocused }));
    };

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };

    onSortChange = (e) => {
        console.log(e.target.value);
        e.target.value === "date" ? this.props.sortByDate() : this.props.sortByAmount();
    };

    render() {
        return (
            <div>
                <input type="text" value={this.props.filters.text} onChange={this.onTextChange} placeholder="Search"/>
                <select onChange={this.onSortChange}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDateId="startDateId"
                    endDateId="endDateId"
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
            </div>

        );
    }
};

const mapStateToProps = (state) => {
    return {
        filters: state.filters 
    };
};

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);