/** SET FILTER TEXT ACTION */
export const setTextFilter = (text = '') => ({
    type: 'SET_FILTER_TEXT',
    text  // same as text: text
});

/** SORT BY DATE ACTION */
export const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

/** SORT BY AMOUNT ACTION */
export const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

/** SET START DATE */
export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

/** SET END DATE */
export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});
