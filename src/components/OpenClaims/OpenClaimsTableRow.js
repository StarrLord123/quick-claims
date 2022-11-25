const OpenClaimsTableRow = (claim) => {
    return (
        <tr key={claim.policyNumber}>
            <td>{claim.policyNumber}</td><td>{claim.surname}</td><td>{claim.updates}</td><td>{claim.status}</td>
        </tr>
    );
};

export default OpenClaimsTableRow;