import './ClaimSearch.css';
import {useState} from 'react';
import {getAllClaims} from './../../data/DataFunctions';
import ClaimSearchTableRow from "./ClaimSearchTableRow";

const Claims = () => {

    const claims = getAllClaims();
    const allClaimsStatus = claims.map(claim => claim.status);
    const uniqueStatus = allClaimsStatus.filter((status, index) => allClaimsStatus.indexOf(status) === index);

    const [selectedStatus, setSelectedStatus] = useState(uniqueStatus[0])

    const changeStatus = (e) => {
        const option = e.target.options.selectedIndex;
        setSelectedStatus(uniqueStatus[option]);
    }

    return (
        <div>
            <div className="claimSearchStatusSelector">
                Select status: <select onChange={changeStatus}>
                {uniqueStatus.map (status => <option key={status} value={status}>{status}</option>)}
                </select>
            </div>
            <table className="claimSearchTable">
                <thead>
                <tr>
                    <th>Policy Number</th>
                    <th>Surname</th>
                    <th>Updates</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {claims
                    .filter (claim => claim.status === selectedStatus)
                    .map( (claim, index)  => {
                    return claim.status === selectedStatus && <ClaimSearchTableRow key={index} policyNumber={claim.policyNumber} surname={claim.surname} 
                    updates={claim.updates} status={claim.status} /> })}
                </tbody>
            </table>
        </div>
    );
}

export default Claims
