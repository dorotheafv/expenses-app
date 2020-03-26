export const getExpensesTotal = (expenses) => {
  return expenses.length;
};

export const getExpensesTotalAmount = (expenses) => {
  return expenses.reduce(function (accumulator, expense) {
    return accumulator + expense.amount;
  }, 0);
};

//alternative way of getExpensesTotalAmount
//collect all amounts into an array with map 
//then get the toteal with reduce
export const getExpensesTotalAmountToo = (expenses) => {
  return expenses
    .map((expense)=> expense.amount) //returns array with the amounts
    .reduce( (accumulator, value)=> {
      return accumulator + value;
    }, 0);
};