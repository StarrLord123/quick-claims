import Claims from "./Claims";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ClaimSearch = () => {
    return (
    <div>
        <div className="container">
            <div className="text-center">
                <h1>Search claims</h1>
            </div>
            
            <div className="container form">
                <form action="somepage.html" method="get">
                    <p>Enter a policy number or part of the customer's surname</p>

                    <label htmlFor="policyNumber" >Policy Number *</label>
                    <input type="text" name="policyNumber" id="policyNumber" placeholder="policy number" />

                    <label htmlFor="surname" >Surname *</label>
                    <input type="text" name="surname" id="surname" placeholder="surname" />

                    <button className="button text-center">Search</button>
                </form>
            </div>  
            <Claims />
        </div>
    </div>);
}

export default ClaimSearch;