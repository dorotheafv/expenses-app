//export a stateless functional component 
import React from 'react';
import {Link} from 'react-router-dom';

const ExpenseListItem = ({ id, description, amount}) => (
    <div>
       <h3><Link to={"/edit/"+id}>{description}</Link></h3>
       <p>amount : {amount}</p>
 
    </div>
);

export default (ExpenseListItem);



