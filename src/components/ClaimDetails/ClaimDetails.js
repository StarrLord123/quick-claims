import React, { useContext, useEffect, useState} from "react";
import { getClaimById } from "../../data/DataFunctions";
import { useParams, NavLink } from "react-router-dom";
import AddNoteTable from './AddNoteTable';
import { UserContext } from '../contexts/UserContext';
import NoteTable from "./NoteTable";

const ClaimDetails = () =>  
{
    const params = useParams();
    const claimId = params.id;

    const [claim, setClaim] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const currentUser = useContext(UserContext);

    const loadData = () => {
        if (claim.length === 0) {
            setIsLoading(true);
            getClaimById(+claimId, currentUser.user.name, currentUser.user.password)
            .then ( response => {
                if (response.status === 200) {
                    setIsLoading(false);
                    setClaim(response.data);
                }
                else {
                    console.log("something went wrong", response.status)
                }
            })
            .catch( error => {
                console.log("something went wrong", error);
            })   
        }     
    }

    useEffect( ()=> {
            loadData();
        }, [] );

   return (<>
            {isLoading && <p style={{textAlign:"center"}} >Please wait... loading</p>}
            {!isLoading &&
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
                                    <td>Date:</td>
                                    <td>{claim.date}</td>
                                </tr>
                                <tr>
                                    <td>Amount:</td>
                                    <td>{claim.amount}</td>
                                </tr>

                                {(claim.insuranceType === "Property") &&
                                    <>
                                        <tr>
                                            <td>Property Address:</td>
                                            <td>{claim.propertyAddress}</td>
                                        </tr>
                                    </>}

                                {(claim.insuranceType === "Motor") &&
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
                                    </>}

                                {(claim.insuranceType === "Pet") &&
                                    <>
                                        <tr>
                                            <td>Pet Type:</td>
                                            <td>{claim.animalType}</td>
                                        </tr>
                                        <tr>
                                            <td>Pet Breed:</td>
                                            <td>{claim.animalBreed}</td>
                                        </tr>
                                    </>}

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
                    {(claim.status == "new claim"|| claim.status == "assessed" || claim.status == "accepted - awaiting payment" || claim.status == "high value")  
                        && <button className="button"><NavLink className="nav-link" to={`/edit/${claim.id}` }>Edit</NavLink></button>}
                </div>
                
                <div className="text-center">
                    <h2>Notes</h2>
                    </div>

                <div/>

                <div className="container form card rounded shadow p-3">
                    <NoteTable/>
                </div>

            </div>
        }
        </>
        );
};

export default ClaimDetails;