import { NavLink } from "react-router-dom";

const NoteTableRow = (props) => {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.claimId}</td>
            <td>{props.completed}</td>
            <td>{props.date}</td>
            <td>{props.note}</td>
            <td></td>
        </tr>
    );
};

export default NoteTableRow;