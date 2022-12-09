import { useReducer, useState } from 'react'
import { addNewTransaction } from '../../data/DataFunctions'
import './AddTransaction.css'

const AddTransaction = () => {

    const [message, setMessage] = useState("");

    const initialNewTransactionState = {orderId : "", 
    date : new Date().toISOString().slice(0,10) , amount : "0",
    country: "", currency: "", taxCode: "0", taxRate: "0.20", type : "SALE"}

    /*
      state =  {orderId : "", date : "", amount : "0", country: "", currency: "", taxCode: "0", taxRate: "0.20", type : "SALE"}
      data = {field : "amount", value : "123"}
    */

    const formReducer = (state, data) => {
        return {...state, [data.field] : data.value}
    }

    //const [statefulVariable, setterFunction] = useReducer(reducerFunction, initialValue);
    const [newTransaction, dispatch] = useReducer(formReducer, initialNewTransactionState);
    
    const handleChange = (event) => {
        //event.target.id = the field
       // event.target.value  = the value
       dispatch({field : event.target.id, value : event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage("Saving...");
        addNewTransaction(newTransaction)
            .then( response => {
                if (response.status === 200) {
                    setMessage("New transaction added with id " + response.data.id);
                }
                else {
                    setMessage("Something went wrong - status code was " + response.status);
                }
                
            } )
            .catch( error => {
                setMessage("Something went wrong - " + error);
            })
    } 

    return (
    <form className="addTransactionsForm" onSubmit={handleSubmit}  >
        <h2>New transaction</h2>
        <label htmlFor="orderId">Order Id</label>
        <input type="text" id="orderId" value={newTransaction.orderId} onChange={handleChange} />
        <br/>
        <label htmlFor="date">Date</label>
        <input type="date" id="date" value={newTransaction.date} onChange={handleChange}/>
        <br/>
        <label htmlFor="country">Country</label>
        <input type="text" id="country" value={newTransaction.country} onChange={handleChange} />
        <br/>
        <label htmlFor="currency">Currency</label>
        <input type="text"  id="currency" value={newTransaction.currency} onChange={handleChange}/>
        <br/>
        <label htmlFor="amount">Amount</label>
        <input type="text"  id="amount" value={newTransaction.amount} onChange={handleChange}/>
        <br/>
        <label htmlFor="taxCode">Tax Code</label>
        <input type="text"  id="taxCode" value={newTransaction.taxCode} onChange={handleChange}/>
        <br/>
        <label htmlFor="taxRate">Tax Rate</label>
        <input type="text"  id="taxRate" value={newTransaction.taxRate} onChange={handleChange}/>
        <br/>
        <label htmlFor="type">Type</label>
        <input type="text"  id="type" value={newTransaction.type} onChange={handleChange} />
        <br/>
        <button type="submit" >Save</button>
        <div>{message}</div> 
    </form>
    )
}

export default AddTransaction;