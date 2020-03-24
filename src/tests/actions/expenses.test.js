import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object',()=>{
    const action =  removeExpense({id:"123abc"});
    expect(action).toEqual({
        type:'REMOVE_EXPENSE',
        id: '123abc'
    });
});   

test('should setup add expense action object with default values',()=>{
    const action =  addExpense();
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense :{
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0 
        }
    });
});

test('should setup add expense action object with provided values',()=>{
    const data = {description: 'backpack',note:'for kopenhagen',amount: 3000, createdAt: 1000};
    const action =  addExpense(data);
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense :{
            ...data, 
            id: action.expense.id
        }
    });
}); 


test('should setup edit expense action object',()=>{
    const action =  editExpense( "123abc", { note : "new note value"});
    expect(action).toEqual({
        type:'EDIT_EXPENSE',
        id:"123abc",
        updates: {
            note : "new note value"
        }
            
        
    });
}); 