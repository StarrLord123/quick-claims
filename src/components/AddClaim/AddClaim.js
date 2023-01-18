import { useReducer, useState, useEffect } from 'react'
import { getAllClaims } from '../../data/DataFunctions';
import './AddClaim.css'

const AddClaim = () => {

    const [claims, setClaims] = useState([]);
    
    const initialNewClaimState = {
        policyNumber : "", 
        date : new Date().toISOString().slice(0,10),
        insuranceType: "", 
        title: "",
        forename : "",
        surname: "",
        amount: "",
        reason : "",
        updates : "",
        status : ""
    }

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
        if (newClaim.updates === "Accepted - Paid" || newClaim.updates === "Rejected") {
            newClaim.status = "Closed"
        }
        else{
            newClaim.status = "Open"
        }
        newClaim.insuranceType = chosenOption;
        claims.push(newClaim);
        setClaims(claims);
        console.log("Claims", claims);
        console.log("New claim", newClaim);
    } 
    
    const [viewPropertyFields, setViewPropertyFields] = useState(false);
    const [viewMotorFields, setViewMotorFields] = useState(false);
    const [viewPetFields, setViewPetFields] = useState(false);

    const [chosenOption, setChosenOption] = useState("");

    const propertyFields = viewPropertyFields &&
    <div>
        <label htmlFor="propertyAddress">Property Address *</label>
        <input type="text" id="propertyAddress" placeholder="Property Address" value={newClaim.propertyAddress} onChange={handleChange}/>
    </div>

    const motorFields = viewMotorFields &&
    <div>
        <label htmlFor="vehicleMake">Vehicle Make *</label>
        <input type="text" id="vehicleMake" placeholder="Vehicle Make*" value={newClaim.vehicleMake} onChange={handleChange}/>

        <label htmlFor="vehicleModel">Vehicle model *</label>
        <input type="text" id="vehicleModel" placeholder="Vehicle model *" value={newClaim.vehicleModel} onChange={handleChange}/>

        <label htmlFor="vehicleYear">Vehicle Manufacture Year *</label>
        <input type="text" id="vehicleYear" placeholder="Vehicle Manufacture Year" value={newClaim.vehicleYear} onChange={handleChange}/>
    </div>

    const petFields = viewPetFields &&
    <div>
        <label htmlFor="animalType">Animal Type *</label>
        <input type="text" id="animalType" placeholder="Animal Type" value={newClaim.animalType} onChange={handleChange}/>

        <label htmlFor="animalBreed">Animal Breed *</label>
        <input type="text" id="animalBreed" placeholder="Animal Breed" value={newClaim.animalBreed} onChange={handleChange}/>
    </div>

    return (

    <div className="container">
        <div className="text-center">
            <h1>Add claim</h1>
        </div>

        <div className="container form">
            <form className="addClaimsForm" onSubmit={handleSubmit}  >
                <label htmlFor="policyNumber">Policy Number *</label>
                <input type="number" id="policyNumber" placeholder="Policy Number" value={newClaim.policyNumber} onChange={handleChange} />

                <label htmlFor="date">Date *</label>
                <input type="date" id="date" value={newClaim.date} onChange={handleChange}/>

                <label htmlFor="title">Title *</label>
                <select id="title" value={newClaim.title} onChange={handleChange}>
                <option value="" disabled={false}> ---select---</option>
                    <option value="Mr">Mr</option>
                    <option value="Ms">Ms</option>
                    <option value="Mx">Mx</option>
                </select>

                <label htmlFor="forename">Forename *</label>
                <input type="text"  id="forename" placeholder="Forename" value={newClaim.forename} onChange={handleChange}/>

                <label htmlFor="surname">Surname *</label>
                <input type="text"  id="surname" placeholder="Surname" value={newClaim.surname} onChange={handleChange}/>

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

                {propertyFields}
                {motorFields}
                {petFields}

                <label htmlFor="amount">Amount *</label>
                <input type="text"  id="amount" placeholder="£" value={newClaim.amount} onChange={handleChange}/>

                <label htmlFor="reason">Reason *</label>
                <textarea type="text"  id="reason" placeholder="Reason" value={newClaim.reason} onChange={handleChange} rows="4"/>

                <label htmlFor="updates">Updates *</label>
                <select id="updates" value={newClaim.updates} onChange={handleChange}>
                <option value="" disabled={false}> ---select---</option>
                    <option value="New Claim">New Claim - Not yet assessed</option>
                    <option value="Assessed">Assessed - Being worked on</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Accepted - Awaiting Payment">Accepted - Awaiting payment</option>
                    <option value="Accepted - Paid">Accepted - Paid</option>
                    <option value="High Value">High Value Claim</option>
                </select>

                <button className="button text-center" type="submit" >Save</button>
            </form>
        </div>
    </div>
    )
}

export default AddClaim;