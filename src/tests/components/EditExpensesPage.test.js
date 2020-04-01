import React from 'react';
import { shallow } from 'enzyme';
import {EditExpensesPage} from '../../components/EditExpensesPage';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<EditExpensesPage  editExpense={editExpense} removeExpense={removeExpense} history={history} expense={expenses[0]}/>);

})

test('should render EditExpensesPage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle edit expense',() => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id,expenses[0]);
});

test('should handle remove expense',() => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith({id: expenses[0].id});
});