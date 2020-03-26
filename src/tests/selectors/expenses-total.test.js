import {getExpensesTotal, getExpensesTotalAmount} from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should total correctly expenses',()=>{
  const result = getExpensesTotal(expenses);
  expect(result).toBe(3);
});

test('should return 0 if no expenses',()=>{
  const result = getExpensesTotalAmount([]);
  expect(result).toBe(0);
});

test('should add up correctly one expense',()=>{
  const result = getExpensesTotalAmount([expenses[1]]);
  expect(result).toBe(180);
});

test('should add up correctly multiple expenses',()=>{
  const result = getExpensesTotalAmount(expenses);
  expect(result).toBe(670);
});
