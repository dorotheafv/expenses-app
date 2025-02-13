import uuid from 'uuid';
import database from '../firebase/firebase';

// component calls action generator
// action generator returns object
// component dispathes object
// redux store changes

// component calls action generator
// action generator returns function
// component dispathes function
// function runs(has the ability to dispatch other action and do whatever it wants)

/** ADD EXPENSE ACTION */
// export const addExpense = ({ description = "", note = "", amount = 0, createdAt = 0 } = {}) => ({
//     type: 'ADD_EXPENSE',
//     expense: {
//         id: uuid(),
//         description,
//         note,
//         amount,
//         createdAt
//     }
// });


/** ADD EXPENSE ACTION */
/**refactored to use firebase database */
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        //set default value
        const {
            description = "",
            note = "",
            amount = 0,
            createdAt = 0
        } = expenseData;
        const expense = { description, note, amount, createdAt };

        return database.ref(`users/${uid}/expenses`)
            .push(expense)
            .then((ref) => {
                dispatch(addExpense({
                    id: ref.key,
                    ...expense
                }));
            })
            .catch( (e)=> {
                console.log("Data not added due to: " + e);  

            });
    };
};

/** REMOVE EXPENSE ACTION*/
export const removeExpense = ({ id = "" }) => ({
    type: 'REMOVE_EXPENSE',
    id: id
});

/** REMOVE EXPENSE FROM FIREBASE DATABASE*/
export const startRemoveExpense = ({id}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        console.log("trying to remove" + id);
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            console.log('Data is removed!');
            dispatch(removeExpense({ id}));
        }).catch((e) => {
            console.log(`Data with id: ${id} not removed due to ${e}`);
        });

    };

};



/** EDIT EXPENSE ACTION */
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startUpdateExpense = (id, updates) =>{
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(()=>{
            dispatch(editExpense(id, updates));
        }).catch((e)=> {
                console.log("Data not updated due to: " + e);      
        });
    };
};

//SET EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`)
            .once('value') //returns a snapshot with the object structure
            .then((snapshot) => {
                const expenses = [];
                console.log(snapshot.val()); 
                snapshot.forEach((childSnapshot) => {

                    expenses.push({
                        //id contained in childsnaphot will be overwritten by id
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });

                });
                dispatch(setExpenses(expenses));
                console.log(expenses);

            }).catch((e) => {
                    console.log("Data not set due to: " + e);      
            
            });
    };
};