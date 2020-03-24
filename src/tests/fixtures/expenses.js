import moment from 'moment';

export default [{
    id: "1",
    description: "Gum",
    note: '',
    amount: 195,
    createdAt: 0 //January 1st midnight
},
{
    id: "2",
    description: "Rent",
    note: '',
    amount: 180,
    createdAt: moment(0).subtract(4, 'days').valueOf()
},
{
    id: "3",
    description: "Car",
    note: '',
    amount: 295,
    createdAt: moment(0).add(4, 'days').valueOf()
}];
