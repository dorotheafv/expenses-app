import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import AppRouter from './router/AppRouter';
import './styles/styles.scss';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import { addExpense, removeExpense } from './actions/expenses';
import { setEndDate, setTextFilter } from './actions/filters';
import { Provider } from 'react-redux';
import 'react-dates/lib/css/_datepicker.css';//css  for datepicker provided from the libary

const store = configureStore();

const gasExpense = store.dispatch(addExpense({ description: "gas bill", amount: 120 }))
const waterExpense = store.dispatch(addExpense({ description: "water bill", amount: 60 }))
const rentExpense = store.dispatch(addExpense({ description: "rent", amount: 1300 , createdAt: 3000}))
// store.dispatch(setTextFilter("bill"));

// setTimeout(() => {
//     store.dispatch(setTextFilter('rent'));
// }, 3000);

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
// ReactDOM.render(<AppRouter />, document.getElementById('app'));
ReactDOM.render(jsx, document.getElementById('app'));