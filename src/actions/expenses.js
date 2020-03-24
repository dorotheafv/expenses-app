import uuid from 'uuid';

/** ADD EXPENSE ACTION */
const addExpense = ({ description = "", note = "", amount = 0, createdAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

/** REMOVE EXPENSE ACTION */
const removeExpense = ({ id = "" }) => ({
    type: 'REMOVE_EXPENSE',
    id: id
});

/** EDIT EXPENSE ACTION */
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});


module.exports = {
    addExpense,
    removeExpense,
    editExpense
};