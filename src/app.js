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
import  firebase from "./firebase/firebase";

const store = configureStore();

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));