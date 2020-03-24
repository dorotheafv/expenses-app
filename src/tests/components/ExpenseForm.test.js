import React from 'react';
import {shallow} from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';


test('should render ExpenseForm correctly',()=>{
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});


test('should render ExpenseForm with expense data',()=>{
    const wrapper = shallow(<ExpenseForm {...expenses[0]}/>);

    expect(wrapper).toMatchSnapshot();
});

/**user interaction test case */
test('should render error for invalid form submission ',()=>{
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {} 
    });
    expect(wrapper.state('error')).toBe('Please provide description and amount');
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();

});


test('should set description on input correctly',()=>{
    const wrapper = shallow(<ExpenseForm />);
    const value = 'New description';
    wrapper.find('input').at(0).simulate('change',{
        target: {value} 
    });
    expect(wrapper.state('description')).toBe('New description');

    expect(wrapper).toMatchSnapshot();

});

test('should set note on text area correctly',()=>{
    const wrapper = shallow(<ExpenseForm />);
    const value = 'New note';
    wrapper.find('textarea').at(0).simulate('change',{
        target: {value} 
    });
    expect(wrapper.state('note')).toBe('New note');
    expect(wrapper).toMatchSnapshot();
});


test('should set amount on valid input correctly',()=>{
    const wrapper = shallow(<ExpenseForm />);
    const value = '1200';
    wrapper.find('input').at(1).simulate('change',{
        target: {value} 
    });
    expect(wrapper.state('amount')).toBe('1200');
    expect(wrapper).toMatchSnapshot();

});

test('should not set amount on invalid input',()=>{
    const wrapper = shallow(<ExpenseForm />);
    const value = '12.555';
    wrapper.find('input').at(1).simulate('change',{
        target: {value} 
    });
    expect(wrapper.state('amount')).toBe('');
    expect(wrapper).toMatchSnapshot();

});

test('should set default button action correctly',()=>{
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('button').at(0).simulate('submit',{
        preventDefault: () => {}
    });
    expect(wrapper.state('btnAction')).toBe('Add Expense');
    expect(wrapper).toMatchSnapshot();

});


test('should call onSubmit prop for valid form submission ',()=> {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {} 
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note : expenses[0].note,
        createdAt:expenses[0].createdAt
    });
});

test('should set new date on date change ',()=> {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change ',()=> {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused});
    expect(wrapper.state('calendarFocused')).toBe(focused);
});