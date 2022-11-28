import './ClaimSearch.css';
import {getAllClaims} from './../../data/DataFunctions';
import ClaimSearchTableRow from "./ClaimSearchTableRow";

const Claims = () => {

    const claims = getAllClaims();

    return (
        <div>
            <table className="claimSearchTable">
                <thead>
                <tr>
                    <th>Policy Number</th>
                    <th>Surname</th>
                    <th>Updates</th>
                    <th>Status</th>
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>
                {claims
                    .map( (claim, index)  => {
                    return <ClaimSearchTableRow key={index} policyNumber={claim.policyNumber} surname={claim.surname} 
                    updates={claim.updates} status={claim.status} details/> })}
                </tbody>
            </table>
        </div>
    );
}

export default Claims
