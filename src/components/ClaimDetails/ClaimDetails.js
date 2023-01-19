import React, {useState} from "react";
import { getAllClaims } from "../../data/DataFunctions";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import AddNoteTable from './AddNoteTable';

const ClaimDetails = () =>  
{
   const params = useParams();
   const claimId = params.policyNumber;

   const claims = getAllClaims();

   const claim = claims.find(claim => claim.policyNumber === +claimId)

   const navigate = useNavigate();

   const doEdit = (event) => {
    event.preventDefault();
    navigate(`/editclaim/${claimId}`);
    }

    const propertyFields = (claim.insuranceType.toLowerCase() === "property") &&
    <>
        <tr>
            <td>Property Address:</td>
            <td>{claim.propertyAddress}</td>
        </tr>
    </>

    const motorFields = (claim.insuranceType.toLowerCase() === "motor") &&
    <>
        <tr>
            <td>Vehicle Make:</td>
            <td>{claim.vehicleMake}</td>
        </tr>
        <tr>
            <td>Vehicle Model:</td>
            <td>{claim.vehicleModel}</td>
        </tr>
        <tr>
            <td>Manufacture Year:</td>
            <td>{claim.vehicleYear}</td>
        </tr>
    </>

    const petFields = (claim.insuranceType.toLowerCase() === "pet") &&
    <>
        <tr>
            <td>Pet Type:</td>
            <td>{claim.animalType}</td>
        </tr>
        <tr>
            <td>Pet Breed:</td>
            <td>{claim.animalBreed}</td>
        </tr>
    </>

   return <div>
            <div className="container">
                <div className="text-center">
                    <h1>Claim Details</h1>
                </div>
                <div className="container form card rounded shadow p-3">
                    <div className="text-center">
                        <h2>Policy Number {claim.policyNumber}</h2>
                    </div>
                        <table className="claimSearchTable table table-striped table-responsive">
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

                                {propertyFields}
                                {motorFields}
                                {petFields}

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
                    {claim.status === "Open" && <button className="button"><NavLink className="nav-link" to={`/edit/${claim.policyNumber}`}>Edit</NavLink></button>}
                </div>
                
                <div className="text-center">
                    <h2>Tasks</h2>
                    </div>

                <div/>

                <div className="container form card rounded shadow p-3">
                    <AddNoteTable/>
                </div>

            </div>
        </div>
};

export default ClaimDetails;