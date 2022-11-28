import { NavLink } from "react-router-dom";

const OpenClaimsTableRow = (claim) => {
    return (
        <tr key={claim.policyNumber}>
            <td>{claim.policyNumber}</td><td>{claim.surname}</td><td>{claim.updates}</td><td>{claim.status}</td><td><NavLink to={`/claim/${claim.policyNumber}`}>More Details</NavLink></td>
        </tr>
    );
};

export default OpenClaimsTableRow;