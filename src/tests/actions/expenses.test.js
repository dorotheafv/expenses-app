import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: "123abc" });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[1]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[1]
    });
});


test('should setup edit expense action object', () => {
    const action = editExpense("123abc", { note: "new note value" });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: "123abc",
        updates: {
            note: "new note value"
        }


    });
});


test('should add expense to database and  redux store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: "Mouse",
        note: "just a mouse",
        amount: 55,
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData))
        .then(() => {
            //assert action was dispatched correctly
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            });

            //assert expense was saved to database
            return database.ref(`expenses/${actions[0].expense.id}`)
                .once('value');

        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });

});


test('should setup add expense action object with default values', (done)=> {
    const store = createMockStore({});
    const expenseData = {
        description: "",
        note: "",
        amount: 0,
        createdAt: 0
    };
    store.dispatch(startAddExpense())
    .then(() => {
        //assert action was dispatched correctly
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                description :"",
                note :"",
                amount : 0,
                createdAt : 0            
            }
        });

        //assert expense was saved to database
        return database.ref(`expenses/${actions[0].expense.id}`)
            .once('value');

    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});