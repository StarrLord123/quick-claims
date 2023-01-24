import { NavLink } from "react-router-dom";

const ClaimSearchTableRow = (props) => {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.policyNumber}</td>
            <td>{props.insuranceType}</td>
            <td>{props.surname}</td>
            <td>{props.updates}</td>
            <td>{props.status}</td>
            <td><NavLink to={`/claim/${props.policyNumber}`}>More Details</NavLink></td>
        </tr>
    );
};

export default ClaimSearchTableRow;