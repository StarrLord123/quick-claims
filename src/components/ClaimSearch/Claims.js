import './ClaimSearch.css';
import {getAllClaims} from '../../data/DataFunctions';
import ClaimSearchTableRow from "./ClaimSearchTableRow";
import { useEffect, useState } from 'react';

const Claims = (props) => {

    const [claims, setClaims] = useState([]);

    const allClaims = getAllClaims();

    useEffect(() => {
        loadClaims();
    }, []);

    useEffect(() => {
        if(props.searchTerm !== "") {
            const claim = allClaims.filter((claim) => {
                      return (
                        claim.policyNumber.toString().includes(props.searchTerm) ||
                        claim.surname.toLowerCase().includes(props.searchTerm.toLowerCase())
                      );
                    });
            setClaims(claim);
        }
        else loadClaims();
    }, [props.searchTerm])

    const loadClaims = () => {
        setClaims(allClaims);
    }

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

export default Claims;
