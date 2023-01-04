import { useReducer, useState, useEffect } from 'react'
import { getAllClaims } from '../../data/DataFunctions';
import './AddClaim.css'

const AddClaim = () => {

    const [claims, setClaims] = useState([]);
    
    const initialNewClaimState = {policyNumber : "111", 
    date : new Date().toISOString().slice(0,10) , insuranceType: "", 
    title: "", forename : "", surname: "", amount: "100", reason : "",
    updates : "",  status : ""}

    const formReducer = (state, data) => {
        return {...state, [data.field] : data.value}
    }

    const [newClaim, dispatch] = useReducer(formReducer, initialNewClaimState);
    
    const handleChange = (event) => {
       dispatch({field : event.target.id, value : event.target.value});
    }

    useEffect(() => {
        setClaims(getAllClaims);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        claims.push(newClaim);
        setClaims(claims);
        console.log("Claims", claims);
        console.log("New claim", newClaim);
    } 

    return (

    <div className="container">
        <div className="text-center">
            <h1>Add claim</h1>
        </div>

        <div className="container form">
            <form className="addClaimsForm" onSubmit={handleSubmit}  >
                <label htmlFor="policyNumber">Policy Number *</label>
                <input type="text" id="policyNumber" value={newClaim.policyNumber} onChange={handleChange} />

                <label htmlFor="date">Date *</label>
                <input type="date" id="date" value={newClaim.date} onChange={handleChange}/>

                <label htmlFor="insuranceType">Insurance Type *</label>
                <select id="insuranceType" value={newClaim.insuranceType} onChange={handleChange}>
                <option value="" disabled={false}> ---select---</option>
                    <option value="property">Property</option>
                    <option value="motor">Motor</option>
                    <option value="pet">Pet</option>
                </select>

                <label htmlFor="title">Title *</label>
                <select id="title" value={newClaim.title} onChange={handleChange}>
                <option value="" disabled={false}> ---select---</option>
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
                <select id="status" value={newClaim.status} onChange={handleChange}>
                <option value="" disabled={false}> ---select---</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                </select>

                <button className="button text-center" type="submit" >Save</button>
            </form>
        </div>
    </div>
    )
}

export default AddClaim;