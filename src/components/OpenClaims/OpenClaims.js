import './OpenClaims.css';
import {useState} from 'react';
import {getAllClaims} from './../../data/DataFunctions';
import OpenClaimsTableRow from "./OpenClaimsTableRow";

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
            <div className="container">
                <div className="text-center">
                    <h1>Open claims</h1>
                </div>
                <div className="container form">

                    <div className="openClaimsStatusSelector">
                        Select status: <select onChange={changeStatus}>
                        {uniqueStatus.map (status => <option key={status} value={status}>{status}</option>)}
                        </select>
                    </div>
                    <table className="openClaimsTable">
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
                            return claim.status === selectedStatus && <OpenClaimsTableRow key={index} policyNumber={claim.policyNumber} surname={claim.surname} 
                            updates={claim.updates} status={claim.status} /> })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Claims
