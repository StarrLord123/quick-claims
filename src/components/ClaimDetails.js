import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllClaims } from "../data/DataFunctions";
import { useParams } from "react-router-dom";

const ClaimDetails = () =>  
{
   const params = useParams();
   const claimId = params.policyNumber;

   const claims = getAllClaims();

   const claim = claims.find(claim => claim.policyNumber === parseInt(claimId))

   return <div>
        <div className="container">
            <div className="text-center">
                <h1>Claim Details</h1>
            </div>
            
            <div className="container form">
                <h1>Policy Number: {claim.policyNumber}</h1>
                <h1>Surname: {claim.surname}</h1>
                <h1>Updates: {claim.updates}</h1>
                <h1>Status: {claim.status}</h1>
            </div>
        </div>
    </div>
};

export default ClaimDetails;