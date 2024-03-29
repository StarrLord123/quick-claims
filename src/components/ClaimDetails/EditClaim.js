import { useContext, useState, useEffect } from 'react'
import { getClaimById, updateClaim, getAllClaimsForPolicyNumber, getAllNotesForClaim } from '../../data/DataFunctions';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './EditClaim.css'
import { UserContext } from '../contexts/UserContext';

const EditClaim = () => {

    const params = useParams();
    const claimId = params.id;

    const [claim, setClaim] = useState([]);
    const [editClaim, setEditClaim] = useState([]);
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const currentUser = useContext(UserContext);

    const loadData = () => {
        setIsLoading(true);
        getClaimById(+claimId, currentUser.user.name, currentUser.user.password)
        .then ( response => {
            if (response.status === 200) {
                setIsLoading(false);
                setClaim(response.data);
                setEditClaim(response.data)
                getAllNotesForClaim(+claimId, currentUser.user.name, currentUser.user.password)
                    .then ( response => {
                        if (response.status === 200) {
                            setNotes(response.data)
                        }
                        else {
                            console.log("something went wrong", response.status)
                        }})
                    .catch( error => {
                        console.log("something went wrong", error);
                    });  
                setChosenOption(response.data.insuranceType);
                if(response.data.insuranceType === "Property") {
                    setViewPropertyFields(true);
                    setViewMotorFields(false);
                    setViewPetFields(false);
                }   
                if(response.data.insuranceType === "Motor") {
                    setViewMotorFields(true);
                    setViewPropertyFields(false);
                    setViewPetFields(false);
                }
                if(response.data.insuranceType === "Pet") {
                    setViewPetFields(true);
                    setViewPropertyFields(false);
                    setViewMotorFields(false);
                }
                if(response.data.insuranceType === "") {
                    setViewPetFields(false);
                    setViewPropertyFields(false);
                    setViewMotorFields(false);
                }
            }
            else {
                console.log("something went wrong", response.status)
            }
        })
        .catch( error => {
            console.log("something went wrong", error);
        })   
    }

    useEffect( ()=> {
        loadData();
    }, [claimId] );

    const navigate = useNavigate();

    const handleChange = event => {
       setEditClaim({ ...editClaim, [event.target.id] : event.target.value});
    }

    const haveNotCompleteNotes = (notes) => {
        return notes.some(note => note.completed === 'Not Completed');
      };

    const handleSubmit = (event) => {
        setMessage("Saving...");
        event.preventDefault();

        editClaim.insuranceType = chosenOption;

        editClaim.id = +claimId;
        
        getAllClaimsForPolicyNumber(editClaim.policyNumber, currentUser.user.name, currentUser.user.password)
        .then( response => {
            if (response.data.length > 0 && claim.policyNumber !== editClaim.policyNumber) {
                setMessage("Policy number " + editClaim.policyNumber + " already exists, please select a different policy number")
            }
            else{
                updateClaim(editClaim, currentUser.user.name, currentUser.user.password)
                    .then( response => {
                        if (response.status === 200) {
                            setMessage("Transaction with id " + response.data.id + " has been edited");
                        }
                        else {
                            setMessage("Something went wrong - status code was " + response.status);
                        }
                        
                    } )
                    .catch( error => {
                        setMessage("Something went wrong - " + error);
                    })
        
                navigate(`/claim/${editClaim.id}`);
            }
        })       
        .catch( error => {
            setMessage("Something went wrong - " + error);
        })
    } 

    const [viewPropertyFields, setViewPropertyFields] = useState(false);
    const [viewMotorFields, setViewMotorFields] = useState(false);
    const [viewPetFields, setViewPetFields] = useState(false);

    const [chosenOption, setChosenOption] = useState("");
 

    return <>
        {isLoading && <p style={{textAlign:"center"}} >Please wait... loading</p>}
        {!isLoading &&
        <div className="container">
            <div className="text-center">
                <h1>Edit claim</h1>
            </div>

            <div className="container form card rounded shadow p-3">
                <form className="editClaimsForm" onSubmit={handleSubmit}  >
                    <label htmlFor="policyNumber">Policy Number *</label>
                    <input type="number" id="policyNumber" value={editClaim.policyNumber}  onChange={handleChange} required />

                    <label htmlFor="date">Date *</label>
                    <input type="date" id="date" value={editClaim.date}  onChange={handleChange} required/>

                    <label htmlFor="title">Title *</label>
                    <select id="title" value={editClaim.title}  onChange={handleChange} required>
                    <option value="" disabled={false}> ---select---</option>
                        <option value="Mr">Mr</option>
                        <option value="Ms">Ms</option>
                        <option value="Mx">Mx</option>
                    </select>

                    <label htmlFor="forename">Forename *</label>
                    <input type="text"  id="forename" value={editClaim.forename}  onChange={handleChange} required/>

                    <label htmlFor="surname">Surname *</label>
                    <input type="text"  id="surname" value={editClaim.surname}  onChange={handleChange} required/>

                    <label htmlFor="insuranceType">Insurance Type *</label>
                    <select id="insuranceType" value={chosenOption} required
                    onChange={(e) => {
                        setChosenOption(e.target.value);
                        if(e.target.value === "Property") {
                            setViewPropertyFields(true);
                            setViewMotorFields(false);
                            setViewPetFields(false);
                        }   
                        if(e.target.value === "Motor") {
                            setViewMotorFields(true);
                            setViewPropertyFields(false);
                            setViewPetFields(false);
                        }
                        if(e.target.value === "Pet") {
                            setViewPetFields(true);
                            setViewPropertyFields(false);
                            setViewMotorFields(false);
                        }
                        if(e.target.value === "") {
                            setViewPetFields(false);
                            setViewPropertyFields(false);
                            setViewMotorFields(false);
                        }
                    }}>
                    <option value="" disabled={false}> ---select---</option>
                        <option value="Property">Property</option>
                        <option value="Motor">Motor</option>
                        <option value="Pet">Pet</option>
                    </select>

                    {viewPropertyFields &&
                        <div>
                            <label htmlFor="propertyAddress">Property Address *</label>
                            <input type="text" id="propertyAddress" placeholder="Property Address" value={editClaim.propertyAddress} onChange={handleChange} required/>
                        </div>}
                    {viewMotorFields &&
                        <div>
                            <label htmlFor="vehicleMake">Vehicle Make *</label>
                            <input type="text" id="vehicleMake" placeholder="Vehicle Make*" value={editClaim.vehicleMake} onChange={handleChange} required/>

                            <label htmlFor="vehicleModel">Vehicle model *</label>
                            <input type="text" id="vehicleModel" placeholder="Vehicle model *" value={editClaim.vehicleModel} onChange={handleChange} required/>

                            <label htmlFor="vehicleYear">Vehicle Manufacture Year *</label>
                            <input type="text" id="vehicleYear" placeholder="Vehicle Manufacture Year" value={editClaim.vehicleYear} onChange={handleChange} required/>
                        </div>}
                    {viewPetFields &&
                        <div>
                            <label htmlFor="animalType">Animal Type *</label>
                            <input type="text" id="animalType" placeholder="Animal Type" value={editClaim.animalType} onChange={handleChange} required/>

                            <label htmlFor="animalBreed">Animal Breed *</label>
                            <input type="text" id="animalBreed" placeholder="Animal Breed" value={editClaim.animalBreed} onChange={handleChange} required/>
                        </div>}

                    <label htmlFor="amount">Amount *</label>
                    <input type="text"  id="amount" value={editClaim.amount}  onChange={handleChange} required/>

                    <label htmlFor="reason">Reason *</label>
                    <textarea type="text"  id="reason" value={editClaim.reason}  onChange={handleChange} rows="4" cols="30" required/>
                    <br></br>
                    <label htmlFor="updates">Updates *</label>
                    <textarea type="text"  id="updates" value={editClaim.updates} onChange={handleChange} rows="4" cols="30" required/>
                    <br></br>
                    <label htmlFor="status">Status *</label>
                    <select id="status" value={editClaim.status}  onChange={handleChange} required>
                    <option value="" disabled={false}> ---select---</option>
                        <option value="new claim">New Claim - Not yet assessed</option>
                        <option value="assessed">Assessed - Being worked on</option>
                        <option value="rejected">Rejected</option>
                        {!haveNotCompleteNotes(notes) && <option value="accepted - awaiting payment">Accepted - Awaiting payment</option>}
                        {!haveNotCompleteNotes(notes) && <option value="accepted - paid">Accepted - Paid</option>}
                        <option value="high value">High Value Claim</option>
                    </select>
                    <br></br>
                    <button className="button text-center" >Save</button>
                    <div>{message}</div>
                </form>

            </div>

        </div>}
    </>
}

export default EditClaim;

