import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import AppRouter, { history } from './router/AppRouter';
import './styles/styles.scss';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import{ addExpense, removeExpense, startSetExpenses } from './actions/expenses';
import { setEndDate, setTextFilter } from './actions/filters';
import { Provider } from 'react-redux';
import 'react-dates/lib/css/_datepicker.css';//css  for datepicker provided from the libary
import { firebase } from './firebase/firebase';
import { login, logout } from './actions/auth';

const store = configureStore();

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));



//triggered every time authentication state changes
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('Log in' + user.uid);
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
        });
        if(history.location.pathname ==='/'){
            history.push('/dashboard');
        }
    } else {
        console.log('Log out');
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});