import React from "react";
import { getAllClaims } from "../data/DataFunctions";
import { useParams } from "react-router-dom";

const ClaimDetails = () =>  
{
   const params = useParams();
   const claimId = params.policyNumber;

   const claims = getAllClaims();

   const claim = claims.find(claim => claim.policyNumber === +claimId)

   return <div>
        <div className="container">
            <div className="text-center">
                <h1>Claim Details</h1>
            </div>
            
            <div className="container form">
                <h2>Policy Number: {claim.policyNumber}</h2>
                <h2>Insurance Type: {claim.insuranceType}</h2>
                <h2>Forename: {claim.forename}</h2>
                <h2>Surname: {claim.surname}</h2>
                <h2>Amount: {claim.amount}</h2>
                <h2>Reason: {claim.reason}</h2>
                <h2>Updates: {claim.updates}</h2>
                <h2>Status: {claim.status}</h2>
            </div>
        </div>
    </div>
};

export default ClaimDetails;