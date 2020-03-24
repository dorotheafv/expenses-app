import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

const action = [
    {
        type: 'ADD_EXPENSE',
        expense: {
            id: "3",
            description: "Car",
            note: '',
            amount: 295,
            createdAt: moment(0).add(4, 'days').valueOf()
        }
    },
    {
        type: 'REMOVE_EXPENSE',
        id: "3"
    },
    { type: 'EDIT_EXPENSE',
      id: "3",
      updates:{
          note: 'note',
          amount: 78
      }
    },
    {
        type: 'REMOVE_EXPENSE',
        id: "non_valid"
    },
    { type: 'EDIT_EXPENSE',
    id: "non_valid",
    updates:{
        note: 'note',
        amount: 78
    }
  }
];


test('should add expense', () => {
    const expensesList = expensesReducer(expenses, action[0]);
    expect(expensesList).toEqual([...expenses, action[0].expense]);
    expect(expensesList.length).toBe(4);

});

test('should remove existing expense ', () => {
    const expensesList = expensesReducer(expenses, action[1]);
    expect(expensesList).toEqual([expenses[0],expenses[1]]);
    expect(expensesList.length).toBe(2);

});

test('should not remove non existing expense', () => {
    const expensesList = expensesReducer(expenses, action[3]);
    expect(expensesList).toEqual(expenses);
    expect(expensesList.length).toBe(3);

});

test('should edit expense', () => {
    const expensesList = expensesReducer(expenses, action[2]);
    expect(expensesList[2].note).toEqual(action[2].updates.note);
    expect(expensesList[2].amount).toEqual(action[2].updates.amount);

});

test('should not edit a non valid expense', () => {
    const expensesList = expensesReducer(expenses, action[4]);
    expect(expensesList).toEqual(expenses);

});