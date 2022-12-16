import React from "react";
import { getAllClaims } from "../../data/DataFunctions";
import { useParams } from "react-router-dom";

const ClaimDetails = () =>  
{
   const params = useParams();
   const claimId = params.policyNumber;

   const claims = getAllClaims();

   const claim = claims.find(claim => claim.policyNumber === +claimId)

//    const doEdit = (event) => {
//     event.preventDefault();
//     props.setSearchTerm(localSearchTerm);
//     navigate(`/claimedit/${localSearchTerm}`);
// }

   return <div>
            <div className="container">
                <div className="text-center">
                    <h1>Claim Details</h1>
                </div>
                <div className="container form">
                    <div className="text-center">
                        <h2>Policy Number {claim.policyNumber}</h2>
                    </div>
                    <div>
                        <table className="claimSearchTable">
                            <thead>
                                <tr>
                                    <th>Heading</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Policy Number:</td>
                                    <td>{claim.policyNumber}</td>
                                </tr>
                                <tr>
                                    <td>Insurance Type:</td>
                                    <td>{claim.insuranceType}</td>
                                </tr>
                                <tr>
                                    <td>Forename:</td>
                                    <td>{claim.forename}</td>
                                </tr>
                                <tr>
                                    <td>Surname:</td>
                                    <td>{claim.surname}</td>
                                </tr>
                                <tr>
                                    <td>Amount:</td>
                                    <td>{claim.amount}</td>
                                </tr>
                                <tr>
                                    <td>Reason:</td>
                                    <td>{claim.reason}</td>
                                </tr>
                                <tr>
                                    <td>Updates:</td>
                                    <td>{claim.updates}</td>
                                </tr>
                                <tr>
                                    <td>Status:</td>
                                    <td>{claim.status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
        </div>
};

export default ClaimDetails;