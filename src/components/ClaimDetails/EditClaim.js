import { useReducer, useState, useEffect } from 'react'
import { getClaimById, updateClaim } from '../../data/DataFunctions';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './EditClaim.css'
import EditUpdatesSelector from './EditUpdatesSelector';

const EditClaim = () => {

    const params = useParams();
    const claimId = params.id;

    const [claim, setClaim] = useState([]);
    //const [editClaim, setEditClaim] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [initialEditClaimState, setInitialEditClaimState] = useState([]);
    const [message, setMessage] = useState("");

    const loadData = () => {
        setIsLoading(true);
        getClaimById(+claimId)
        .then ( response => {
            if (response.status === 200) {
                setIsLoading(false);
                setClaim(response.data);

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

    const formReducer = (state, data) => {
        return {...state, [data.field] : data.value}
    }

    const [editClaim, dispatch] = useReducer(formReducer, claim);

    const handleChange = (event) => {
       dispatch({field : event.target.id, value : event.target.value});
    }

    const changeUpdates = (updates) => {
        dispatch({field : "updates", value : updates});
    }

    const handleSubmit = (event) => {
        setMessage("Saving...");
        event.preventDefault();

        
        // const updatedClaims = props.newClaims.filter(
        //     claim => claim.policyNumber !== editClaim.policyNumber
        // )

        editClaim.insuranceType = chosenOption;

        if (editClaim.updates === "Accepted - Paid" || editClaim.updates === "Rejected") {
            editClaim.status = "Closed"
        }
        else{
            editClaim.status = "Open"
        }

        editClaim.id = +claimId;

        console.log("The claim", editClaim);

        updateClaim(editClaim)
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
        
        // props.setNewClaims([...updatedClaims, claim]);
        //navigate(`/claim/${claim.policyNumber}`)
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
                    <input type="number" id="policyNumber" value={editClaim.policyNumber} defaultValue={claim.policyNumber} onChange={handleChange} />

                    <label htmlFor="date">Date *</label>
                    <input type="date" id="date" value={editClaim.date} defaultValue={claim.date} onChange={handleChange}/>

                    <label htmlFor="title">Title *</label>
                    <select id="title" value={editClaim.title} defaultValue={claim.title} onChange={handleChange}>
                    <option value="" disabled={false}> ---select---</option>
                        <option value="Mr">Mr</option>
                        <option value="Ms">Ms</option>
                        <option value="Mx">Mx</option>
                    </select>

                    <label htmlFor="forename">Forename *</label>
                    <input type="text"  id="forename" value={editClaim.forename} defaultValue={claim.forename} onChange={handleChange}/>

                    <label htmlFor="surname">Surname *</label>
                    <input type="text"  id="surname" value={editClaim.surname} defaultValue={claim.surname} onChange={handleChange}/>

                    <label htmlFor="insuranceType">Insurance Type *</label>
                    <select id="insuranceType" value={chosenOption} 
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
                            <input type="text" id="propertyAddress" placeholder="Property Address" value={editClaim.propertyAddress} defaultValue={claim.propertyAddress} onChange={handleChange}/>
                        </div>}
                    {viewMotorFields &&
                        <div>
                            <label htmlFor="vehicleMake">Vehicle Make *</label>
                            <input type="text" id="vehicleMake" placeholder="Vehicle Make*" value={editClaim.vehicleMake} defaultValue={claim.vehicleMake} onChange={handleChange}/>

                            <label htmlFor="vehicleModel">Vehicle model *</label>
                            <input type="text" id="vehicleModel" placeholder="Vehicle model *" value={editClaim.vehicleModel} defaultValue={claim.vehicleModel} onChange={handleChange}/>

                            <label htmlFor="vehicleYear">Vehicle Manufacture Year *</label>
                            <input type="text" id="vehicleYear" placeholder="Vehicle Manufacture Year" value={editClaim.vehicleYear} defaultValue={claim.vehicleYear} onChange={handleChange}/>
                        </div>}
                    {viewPetFields &&
                        <div>
                            <label htmlFor="animalType">Animal Type *</label>
                            <input type="text" id="animalType" placeholder="Animal Type" value={editClaim.animalType} defaultValue={claim.animalType} onChange={handleChange}/>

                            <label htmlFor="animalBreed">Animal Breed *</label>
                            <input type="text" id="animalBreed" placeholder="Animal Breed" value={editClaim.animalBreed} defaultValue={claim.animalBreed} onChange={handleChange}/>
                        </div>}

                    <label htmlFor="amount">Amount *</label>
                    <input type="text"  id="amount" value={editClaim.amount} defaultValue={claim.amount} onChange={handleChange}/>

                    <label htmlFor="reason">Reason *</label>
                    <textarea type="text"  id="reason" value={editClaim.reason} defaultValue={claim.reason} onChange={handleChange} rows="4"/>

                    <EditUpdatesSelector value={editClaim.updates} defaultValue={claim.updates} changeUpdates={changeUpdates} />

                    <button className="button text-center" >Save</button>
                    <div>{message}</div>
                </form>

            </div>

        </div>}
    </>
}

export default EditClaim;

