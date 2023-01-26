import './OpenClaims.css';
import {useEffect, useState} from 'react';
import {getAllClaimsForUpdates} from '../../data/DataFunctions';
import OpenClaimsTableRow from "./OpenClaimsTableRow";
import UpdatesSelector from './UpdatesSelector';
import { useSearchParams } from 'react-router-dom';


const Claims = () => {

    const [claims, setClaims] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();

    const loadData = (updates) => {
        getAllClaimsForUpdates(updates)
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
       
    const [selectedUpdates, setSelectedUpdates] = useState("");

    useEffect( ()=> {
        const updates = searchParams.get("updates");
        if (updates !== selectedUpdates) {
            setSelectedUpdates(updates);
            loadData(updates);
        }
     }, [searchParams] );

    const changeUpdates = (updates) => {
        setSearchParams({"updates" : updates});
    }

    return (
        <>
        <div className="container">
            <div className="text-center">
                <h1>Claims By Status Update</h1>
            </div>
            <div className="container form card rounded shadow p-3">
                <form className="updatesSelector">
                    {!isLoading  && <UpdatesSelector changeUpdates={changeUpdates}  />}
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
                            return claim.updates === selectedUpdates && <OpenClaimsTableRow key={index} id={claim.id} policyNumber={claim.policyNumber} insuranceType={claim.insuranceType} surname={claim.surname} 
                            updates={claim.updates} status={claim.status} details/> })}
                        </tbody>
                    </table>}
                </div>
        </>
    );
}

export default Claims
