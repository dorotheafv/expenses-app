import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import  expensesReducer from '../reducers/expenses';
import  filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';

// export default () => {
//     /** Store creation */
//     const store = createStore(
//         combineReducers({
//             expenses: expensesReducer,
//             filters: filtersReducer
//         }),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     );
//     return store;
// };

/** refactored to apply thunk middleware */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

export default () => {
    /** Store creation */
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer,
            auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};
