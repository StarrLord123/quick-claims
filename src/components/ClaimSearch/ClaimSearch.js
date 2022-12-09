import Claims from "./Claims";
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

const ClaimSearch = (props) => {

    const [localSearchTerm, setLocalSearchTerm] = useState("");
    const [valid, setValid] = useState(true);
    const [touched, setTouched] = useState(false);
    const navigate = useNavigate();

    const checkValidity = (value) => {
        setValid(value.trim().length > 0);
    }

    const doSearch = (event) => {
        event.preventDefault();
        props.setSearchTerm(localSearchTerm);
        navigate(`/claimsearch/${localSearchTerm}`);
    }

    const handleChange = (event) => {
        setTouched(true);
        setLocalSearchTerm(event.target.value);
        checkValidity(event.target.value);
    }

    const clearForm = () => {
        setLocalSearchTerm("");
        setTouched(false);
        setValid(true);
        props.setSearchTerm("");
    }

    return (
    <div>
        <div className="container">
            <div className="text-center">
                <h1>Search claims</h1>
            </div>
            
            <div className="container form">
                <form onSubmit={doSearch}>
                    <p>Enter a policy number</p>

                    <label htmlFor="policyNumber" >Policy Number *</label>
                    <input type="text" name="policyNumber" id="policyNumber" placeholder="policy number" 
                        onChange={handleChange} value={localSearchTerm}  className={!valid ? 'searchBoxError' : ''} />

                    {/* <label htmlFor="surname" >Surname *</label>
                    <input type="text" name="surname" id="surname" placeholder="surname" 
                    value={props.searchTerm} onChange={handleChange} className={!valid ? 'searchBoxError' : ''}/> */}

                    <button type="submit" disabled={!valid || !touched} className="button text-center">Search</button>
                    <button className="button text-center" onClick={clearForm} >Reset</button>
                </form>
            </div>  
            <Claims searchTerm={localSearchTerm} setSearchTerm={localSearchTerm}/>
        </div>
    </div>);
}

export default ClaimSearch;