import React from 'react';
import {shallow} from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';


test('should render ExpensesSummary correctly with 1 expense',()=>{
    const wrapper = shallow(<ExpensesSummary expensesCount={0} expensesAmount={0}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary correctly with multiple expenses',()=>{
    const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesAmount={670} />);
    expect(wrapper).toMatchSnapshot();

});
