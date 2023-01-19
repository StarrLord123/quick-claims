import './OpenClaims.css';
import {useState} from 'react';
import {getAllClaims} from './../../data/DataFunctions';
import OpenClaimsTableRow from "./OpenClaimsTableRow";

const Claims = () => {

    const claims = getAllClaims();
    const allClaimsUpdates = claims.map(claim => claim.updates);
    const uniqueUpdates = allClaimsUpdates.filter((updates, index) => allClaimsUpdates.indexOf(updates) === index);

    const [selectedUpdates, setSelectedUpdates] = useState(uniqueUpdates[0])

    const changeUpdates = (e) => {
        const option = e.target.options.selectedIndex;
        setSelectedUpdates(uniqueUpdates[option]);
    }

    return (
        <div>
            <div className="container">
                <div className="text-center">
                    <h1>Claims By Status Update</h1>
                </div>
                <div className="container form card rounded shadow p-3">

                    <div className="openClaimsStatusSelector">
                        Select By Status Update: <select onChange={changeUpdates}>
                        {uniqueUpdates
                            .map (updates => <option key={updates} value={updates}>{updates}</option>)}
                        </select>
                    </div>
                </div>
                <table className="openClaimsTable table table-striped table-responsive">
                    <thead>
                    <tr>
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
                        return claim.updates === selectedUpdates && <OpenClaimsTableRow key={index} policyNumber={claim.policyNumber} insuranceType={claim.insuranceType} surname={claim.surname} 
                        updates={claim.updates} status={claim.status} details/> })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Claims
