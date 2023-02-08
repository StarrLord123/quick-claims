import './OpenClaims.css';
import { useContext, useEffect, useState} from 'react';
import {getAllClaimsForStatus} from '../../data/DataFunctions';
import OpenClaimsTableRow from "./OpenClaimsTableRow";
import StatusSelector from './StatusSelector';
import { useSearchParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';


const Claims = () => {

    const [claims, setClaims] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const currentUser = useContext(UserContext);

    const [searchParams, setSearchParams] = useSearchParams();

    const loadData = (status) => {
        getAllClaimsForStatus(status, currentUser.user.name, currentUser.user.password)
            .then ( response => {
                if (response.status === 200) {
                    setIsLoading(false);
                    setClaims(response.data);
                }
                else {
                    console.log("something went wrong", response.status)
                }
            })
            .catch( error => {
                console.log("something went wrong", error);
            })
    }
    
    //debugger;
       
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect( ()=> {
        const status = searchParams.get("status");
        if (status !== selectedStatus) {
            setSelectedStatus(status);
            loadData(status);
        }
     }, [searchParams] );

    const changeStatus = (status) => {
        setSearchParams({"status" : status});
        console.log("status", status)
    }

    return (
        <>
        <div className="container">
            <div className="text-center">
                <h1>Claims By Status </h1>
            </div>
            <div className="container form card rounded shadow p-3">
                <form className="updatesSelector">
                    {!isLoading  && <StatusSelector changeStatus={changeStatus}  />}
                </form>
            </div>
                {isLoading && <p style={{textAlign:"center"}} >Please wait... loading</p>}
                {!isLoading &&
                <table className="openClaimsTable table table-striped table-responsive">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Policy #</th>
                        <th>Type</th>
                        <th>Surname</th>
                        <th>Updates</th>
                        <th>Status</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {claims
                        .map( (claim, index)  => {
                        return claim.status === selectedStatus && <OpenClaimsTableRow key={index} id={claim.id} policyNumber={claim.policyNumber} insuranceType={claim.insuranceType} surname={claim.surname} 
                        updates={claim.updates} status={claim.status} details/> })}
                    </tbody>
                </table>}
            </div>
        </>
    );
}

export default Claims
