import { useReducer, useState, useEffect } from 'react'
import { getAllClaimsAxiosVersion, getAllClaimsForPolicyNumber, getClaimById } from '../../data/DataFunctions';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './EditClaim.css'

const EditClaim = () => {

    const params = useParams();
    const claimId = params.id;

    const [claim, setClaim] = useState([]);
    const [editclaim, setEditClaim] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [initialEditClaimState, setInitialEditClaimState] = useState([]);


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
        if (claim.length === 0)
            {loadData();

            setInitialEditClaimState({
                policyNumber : claim.policyNumber, 
                date : new Date().toISOString().slice(0,10), 
                insuranceType: claim.insuranceType, 
                title: claim.title, 
                forename : claim.forename, 
                surname: claim.surname, 
                amount: claim.amount, 
                reason : claim.reason,
                updates : claim.updates,  
                status : claim.status,
                propertyAddress : claim.propertyAddress,
                vehicleMake : claim.vehicleMake,
                vehicleModel : claim.vehicleModel,
                vehicleYear : claim.vehicleYear,
                animalType : claim.animalType,
                animalBreed : claim.animalBreed})
        }
        }, [] );

    const navigate = useNavigate();


    console.log("set init", initialEditClaimState)


    const formReducer = (state, data) => {
        return {...state, [data.field] : data.value}
    }

    const [editClaim, dispatch] = useReducer(formReducer, initialEditClaimState);

    console.log("editClaim", editClaim)

    const handleChange = (event) => {
       dispatch({field : event.target.id, value : event.target.value});
    }

    const handleSubmit = (event) => {
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
        
        // props.setNewClaims([...updatedClaims, editClaim]);
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
                    <input type="number" id="policyNumber" value={editClaim.policyNumber} onChange={handleChange} />

                    <label htmlFor="date">Date *</label>
                    <input type="date" id="date" value={editClaim.date} onChange={handleChange}/>

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
                            <input type="text" id="propertyAddress" placeholder="Property Address" value={editClaim.propertyAddress} onChange={handleChange}/>
                        </div>}
                    {viewMotorFields &&
                        <div>
                            <label htmlFor="vehicleMake">Vehicle Make *</label>
                            <input type="text" id="vehicleMake" placeholder="Vehicle Make*" value={editClaim.vehicleMake} onChange={handleChange}/>

                            <label htmlFor="vehicleModel">Vehicle model *</label>
                            <input type="text" id="vehicleModel" placeholder="Vehicle model *" value={editClaim.vehicleModel} onChange={handleChange}/>

                            <label htmlFor="vehicleYear">Vehicle Manufacture Year *</label>
                            <input type="text" id="vehicleYear" placeholder="Vehicle Manufacture Year" value={editClaim.vehicleYear} onChange={handleChange}/>
                        </div>}
                    {viewPetFields &&
                        <div>
                            <label htmlFor="animalType">Animal Type *</label>
                            <input type="text" id="animalType" placeholder="Animal Type" value={editClaim.animalType} onChange={handleChange}/>

                            <label htmlFor="animalBreed">Animal Breed *</label>
                            <input type="text" id="animalBreed" placeholder="Animal Breed" value={editClaim.animalBreed} onChange={handleChange}/>
                        </div>}

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

                    <button className="button text-center" >Save</button>

                </form>

            </div>

        </div>}
    </>
}

export default EditClaim;