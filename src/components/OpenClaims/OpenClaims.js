import './OpenClaims.css';
import {useState} from 'react';
import {getAllClaims} from './../../data/DataFunctions';
import OpenClaimsTableRow from "./OpenClaimsTableRow";

const Claims = () => {

    const claims = getAllClaims();
    const allClaimsInsuranceType = claims.map(claim => claim.insuranceType);
    const uniqueInsuranceType = allClaimsInsuranceType.filter((insuranceType, index) => allClaimsInsuranceType.indexOf(insuranceType) === index);

    const [selectedInsuranceType, setSelectedInsuranceType] = useState(uniqueInsuranceType[0])

    const changeInsuranceType = (e) => {
        const option = e.target.options.selectedIndex;
        setSelectedInsuranceType(uniqueInsuranceType[option]);
    }

    return (
        <div>
            <div className="container">
                <div className="text-center">
                    <h1>Open claims</h1>
                </div>
                <div className="container form">

                    <div className="openClaimsInsuranceTypeSelector">
                        Select Insurance Type: <select onChange={changeInsuranceType}>
                        {uniqueInsuranceType.map (insuranceType => <option key={insuranceType} value={insuranceType}>{insuranceType}</option>)}
                        </select>
                    </div>
                    <table className="openClaimsTable">
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
                            .filter (claim => claim.status === "Open")
                            .map( (claim, index)  => {
                            return claim.insuranceType === selectedInsuranceType && <OpenClaimsTableRow key={index} policyNumber={claim.policyNumber} insuranceType={claim.insuranceType} surname={claim.surname} 
                            updates={claim.updates} status={claim.status} details/> })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Claims
