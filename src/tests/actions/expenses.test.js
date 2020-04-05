import { startAddExpense, addExpense, editExpense, removeExpense , setExpenses , startSetExpenses, startUpdateExpense,startRemoveExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';


const uid ="testuid";
const createMockStore = configureMockStore([thunk]);
const defaultAuthState = { auth: { uid } };

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: "123abc" });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});


test('should add expense with default values in firebase and redux', (done) => {
    const store = createMockStore(defaultAuthState);
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
                    description: "",
                    note: "",
                    amount: 0,
                    createdAt: 0
                }
            });

            //assert expense was saved to database
            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
                .once('value');

        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
});

test('should remove expense from firebase database',(done)=>{
    const store = createMockStore(defaultAuthState);

    store.dispatch(startRemoveExpense({id:expenses[0].id})).then(()=>{
            //assert action was dispatched correctly
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'REMOVE_EXPENSE',
                 id: expenses[0].id
            });
            return database.ref(`users/${uid}/expenses/${expenses[0].id}`)
            .once('value');
   
    }).then((snapshot)=>{
 
        expect(snapshot.val()).toBeFalsy();
        done();
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
    const store = createMockStore(defaultAuthState);
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
            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
                .once('value');

        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });

});


test('should setup add expense action object with default values', (done) => {
    const store = createMockStore(defaultAuthState);
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
                    description: "",
                    note: "",
                    amount: 0,
                    createdAt: 0
                }
            });

            //assert expense was saved to database
            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
                .once('value');

        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
});


test('should set expenses action object', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({ type: 'SET_EXPENSES',
       expenses
    });
});


test('should fetch expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses())
    .then(() => {
        //assert action was dispatched correctly
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });

        done();
    });
});



test('should update expense in firebase and redux', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[1].id;
    const updates = {
        description: "new",
        note: "just a note"
    };
    store.dispatch(startUpdateExpense(id,updates))
        .then(() => {
            //assert action was dispatched correctly
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'EDIT_EXPENSE',
                id,
                updates
            });

            //assert expense was saved to database
            return database.ref(`expenses/${actions[0].id}`)
                .once('value');

        }).then((snapshot) => {
            expect(snapshot.val().description).toBe(updates.description);
            expect(snapshot.val().note).toBe(updates.note);

            done();
        });
});
