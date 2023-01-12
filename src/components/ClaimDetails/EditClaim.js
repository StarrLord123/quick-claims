import { useReducer, useState, useEffect } from 'react'
import { getAllClaims } from '../../data/DataFunctions';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AddNoteTable from './AddNoteTable';
import './EditClaim.css'

const EditClaim = (props) => {

    const params = useParams();
    const claimId = params.policyNumber;
 
    const claims = getAllClaims();
 
    const claim = claims.find(claim => claim.policyNumber === +claimId)
    const navigate = useNavigate();
    
    const initialEditClaimState = {
        policyNumber : claim.policyNumber, 
        date : new Date().toISOString().slice(0,10) , 
        insuranceType: claim.insuranceType, 
        title: claim.title, 
        forename : claim.forename, 
        surname: claim.surname, 
        amount: claim.amount, 
        reason : claim.reason,
        updates : claim.updates,  
        status : claim.status
    }

    const formReducer = (state, data) => {
        return {...state, [data.field] : data.value}
    }

    const [editClaim, dispatch] = useReducer(formReducer, initialEditClaimState);

    const handleChange = (event) => {
       dispatch({field : event.target.id, value : event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const updatedClaims = props.newClaims.filter(
            claim => claim.policyNumber !== editClaim.policyNumber
        )

        props.setNewClaims([...updatedClaims, editClaim]);
        //navigate(`/claim/${claim.policyNumber}`)
    } 
    console.log(props.newClaims);

    return <div>
        <div className="container">
            <div className="text-center">
                <h1>Edit claim</h1>
            </div>

            <div className="container form">
                <form className="editClaimsForm" onSubmit={handleSubmit}  >
                    <label htmlFor="policyNumber">Policy Number *</label>
                    <input type="text" id="policyNumber" value={editClaim.policyNumber} onChange={handleChange} />

                    <label htmlFor="date">Date *</label>
                    <input type="date" id="date" value={editClaim.date} onChange={handleChange}/>

                    <label htmlFor="insuranceType">Insurance Type *</label>
                    <select id="insuranceType" value={editClaim.insuranceType} onChange={handleChange}>
                    <option value="" disabled={false}> ---select---</option>
                        <option value="Property">Property</option>
                        <option value="Motor">Motor</option>
                        <option value="Pet">Pet</option>
                    </select>

                    <label htmlFor="title">Title *</label>
                    <select id="title" value={editClaim.title} onChange={handleChange}>
                    <option value="" disabled={false}> ---select---</option>
                        <option value="Mr">Mr</option>
                        <option value="Ms">Ms</option>
                        <option value="Mx">Mx</option>
                    </select>

                    <label htmlFor="forename">Forename *</label>
                    <input type="text"  id="forename" value={editClaim.forename} onChange={handleChange}/>

                    <label htmlFor="surname">Surname *</label>
                    <input type="text"  id="surname" value={editClaim.surname} onChange={handleChange}/>

                    <label htmlFor="amount">Amount *</label>
                    <input type="text"  id="amount" value={editClaim.amount} onChange={handleChange}/>

                    <label htmlFor="reason">Reason *</label>
                    <textarea type="text"  id="reason" value={editClaim.reason} onChange={handleChange} rows="4"/>

                    <label htmlFor="updates">Updates *</label>
                    <select id="updates" value={editClaim.updates} onChange={handleChange}>
                    <option value="" disabled={false}> ---select---</option>
                        <option value="New Claim">New Claim - Not yet assessed</option>
                        <option value="Assessed">Assessed - Being worked on</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Accepted - Awaiting Payment">Accepted - Awaiting payment</option>
                        <option value="Accepted - Paid">Accepted - Paid</option>
                        <option value="High Value">High Value Claim</option>
                    </select>

                    <label htmlFor="status">Status *</label>
                    <select id="status" value={editClaim.status} onChange={handleChange}>
                    <option value="" disabled={false}> ---select---</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                    </select>

                    <button className="button text-center" >Save</button>

                    
                </form>

            </div>
                <div className="text-center">
                <h2>Tasks</h2>
                </div>
            <div/>

            <div className="container form">
                    <AddNoteTable/>
            </div>
        </div>
    </div>
}

export default EditClaim;