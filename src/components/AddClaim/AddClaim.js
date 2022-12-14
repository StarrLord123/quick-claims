import { useReducer, useState } from 'react'
import './AddClaim.css'

const AddClaim = () => {

    const [message, setMessage] = useState("");

    const initialNewClaimState = {policyNumber : "", 
    date : new Date().toISOString().slice(0,10) , insuranceType: "", 
    title: "", forename : "", surname: "", amount: "100", reason : "",
    updates : "",  status : ""}

    const formReducer = (state, data) => {
        return {...state, [data.field] : data.value}
    }

    const [newClaim, dispatch] = useReducer(formReducer, initialNewClaimState);
    
    const handleChange = (event) => {
        //event.target.id = the field
       // event.target.value  = the value
       dispatch({field : event.target.id, value : event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage("Saving...");
        // addNewClaim(newClaim)
        //     .then( response => {
        //         if (response.status === 200) {
        //             setMessage("New Claim added with policy number " + response.data.id);
        //         }
        //         else {
        //             setMessage("Something went wrong - status code was " + response.status);
        //         }
                
        //     } )
        //     .catch( error => {
        //         setMessage("Something went wrong - " + error);
        //     })
    } 

    return (

    <div className="container">
        <div className="text-center">
            <h1>Add claim</h1>
        </div>

        <div className="container form">

        <form className="addClaimsForm" onSubmit={handleSubmit}  >
            <label htmlFor="PolicyNumber">Policy Number *</label>
            <input type="text" id="PolicyNumber" value={newClaim.PolicyNumber} onChange={handleChange} />
            <label htmlFor="date">Date *</label>
            <input type="date" id="date" value={newClaim.date} onChange={handleChange}/>
            <label htmlFor="insuranceType">Insurance Type *</label>
            <input type="text" id="insuranceType" value={newClaim.insuranceType} onChange={handleChange} />
            <label htmlFor="title">Title *</label>
            <select id="title" value={newClaim.title} onChange={handleChange}>
            <option value="" disabled={true}> ---select---</option>
                <option value="mr">Mr</option>
                <option value="ms">Ms</option>
                <option value="mx">Mx</option>
            </select>
            <label htmlFor="forename">Forename *</label>
            <input type="text"  id="forename" value={newClaim.forename} onChange={handleChange}/>
            <label htmlFor="surname">Surname *</label>
            <input type="text"  id="surname" value={newClaim.surname} onChange={handleChange}/>
            <label htmlFor="amount">Amount *</label>
            <input type="text"  id="amount" value={newClaim.amount} onChange={handleChange}/>
            <label htmlFor="reason">Reason *</label>
            <input type="text"  id="reason" value={newClaim.reason} onChange={handleChange} />
            <label htmlFor="updates">Updates *</label>
            <input type="text"  id="updates" value={newClaim.updates} onChange={handleChange} />
            <label htmlFor="status">Status *</label>
            <input type="text"  id="status" value={newClaim.status} onChange={handleChange} />
            <br/>
            <button type="submit" >Save</button>
            <div>{message}</div> 
        </form>
        </div>
    </div>
    )
}

export default AddClaim;