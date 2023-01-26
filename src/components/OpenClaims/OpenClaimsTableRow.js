import { NavLink } from "react-router-dom";

const OpenClaimsTableRow = (props) => {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.policyNumber}</td>
            <td>{props.insuranceType}</td>
            <td>{props.surname}</td>
            <td>{props.updates}</td>
            <td>{props.status}</td>
            <td><NavLink to={`/claim/${props.id}`}>More Details</NavLink></td>
        </tr>
    );
};

export default OpenClaimsTableRow;