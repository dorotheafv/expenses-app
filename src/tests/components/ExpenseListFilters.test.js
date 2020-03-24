import { shallow } from 'enzyme';
import React from 'react';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { altFilters, filters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(<ExpenseListFilters
        filters={filters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}

    />
    );
})


test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters correctly', () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const value = 'gum';
    wrapper.find('input').at(0).simulate('change', {
        target: { value } 
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by amount', () => {
    const value = 'amount';
    wrapper.find('select').at(0).simulate('change', {
        target: { value } 
    });
    expect(sortByAmount).toHaveBeenCalledTimes(1);
    expect(sortByDate).toHaveBeenCalledTimes(0);
});

test('should handle date focus changes', () => {
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')('endDate');
    wrapper.find('withStyles(DateRangePicker)').simulate('onFocusChange','endDate');

    expect(wrapper.state('calendarFocused')).not.toBeNull();
    expect(wrapper.state('calendarFocused')).toEqual('endDate');

});

test('should handle date changes', () => {
    const startDate = altFilters.startDate;
    const endDate = altFilters.endDate;
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({
        startDate,
        endDate
    });
    expect(setStartDate).toHaveBeenCalledTimes(1);
    expect(setStartDate).toHaveBeenCalledWith(startDate);    
    expect(setEndDate).toHaveBeenCalledTimes(1);
    expect(setEndDate).toHaveBeenCalledWith(endDate);
});

test('should sort by date', () => {
    const value = 'date';
    wrapper.find('select').at(0).simulate('change', {
        target: { value } 
    });
    expect(sortByDate).toHaveBeenCalledTimes(1);
});


