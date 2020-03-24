import filtersReducer from '../../reducers/filters';
import moment from 'moment';

const action = [
   {type: 'SET_FILTER_TEXT', text: 'gum'},
   { type:'SORT_BY_DATE'},
   {type:'SORT_BY_AMOUNT'},
    {type:'SET_START_DATE', startDate: moment(0)},
    {type:'SET_END_DATE', endDate: moment(100)}
]

const filtersState = {
    text: '', 
    sortBy: 'date',
    startDate: moment().startOf('month'), 
    endDate: moment().endOf('month')  
};

test('should setup default filter values',()=>{
    const state= filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '', 
        sortBy: 'date',
        startDate: moment().startOf('month'), 
        endDate: moment().endOf('month') 
    });
});

test('should set filter text',()=>{
    const state= filtersReducer(filtersState, action[0]);
    expect(state.text).toBe('gum');
});

test('should set filter sort by date',()=>{
    const state= filtersReducer(filtersState, action[1]);
    expect(state.sortBy).toBe('date');
});

test('should set filter sort by amount',()=>{
    const state= filtersReducer(filtersState, action[2]);
    expect(state.sortBy).toBe('amount');
});
test('should set filter start date',()=>{
    const state= filtersReducer(filtersState, action[3]);
    expect(state.startDate).toEqual(moment(0));
});


test('should set filter end date',()=>{
    const state= filtersReducer(filtersState, action[4]);
    expect(state.endDate).toEqual(moment(100));
});