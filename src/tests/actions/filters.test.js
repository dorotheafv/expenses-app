import moment from 'moment';
import {setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate} from '../../actions/filters'


test('should generate start date object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
});

test('should generate end date object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
});


test('should generate sort by date object', () => {
    expect(sortByDate()).toEqual({
        type: 'SORT_BY_DATE'
    })
});

test('should generate sort by amount object', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
});

test('should generate set text filter object', () => {
    const text =  'some text';
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_FILTER_TEXT',
        text
    })
});

test('should generate set  text filter object with default value', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_FILTER_TEXT',
        text: ''
    })
});