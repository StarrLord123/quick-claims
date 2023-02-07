import './ClaimSearch.css';
import {getAllClaimsAxiosVersion} from '../../data/DataFunctions';
import ClaimSearchTableRow from "./ClaimSearchTableRow";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

const Claims = (props) => {

    const [claims, setClaims] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const currentUser = useContext(UserContext);


    useEffect( () => {
        if(props.searchTerm !== "") {
            setIsLoading(true);
            getAllClaimsAxiosVersion(currentUser.user.name, currentUser.user.password)
                .then( response => {
                        const claim = response.data.filter((claim) => {
                            return (
                                claim.policyNumber.includes(props.searchTerm) ||
                                claim.insuranceType.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
                                claim.surname.toLowerCase().includes(props.searchTerm.toLowerCase())
                            );
                        });
                    setClaims(claim);
                    setIsLoading(false);
                } )
                .catch ( error => {
                    console.log("something went wrong", error);
                })
        }
        else {loadData();}
    }, [props.searchTerm]  );


    const loadData = () => {
        getAllClaimsAxiosVersion(currentUser.user.name, currentUser.user.password)
            .then ( response => {
                if (response.status === 200) {
                    setIsLoading(false);
                    setClaims(response.data);
                }
                else {
                    console.log("something went wrong", response.status)
                }
            })
            .catch( error => {
                console.log("something went wrong", error);
            })
    }

    return (<>
            {isLoading && <p style={{textAlign:"center"}} >Please wait... loading</p>}
            {!isLoading &&
            <table className="claimSearchTable table table-striped table-responsive">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Policy Number</th>
                        <th>Insurance Type</th>
                        <th>Surname</th>
                        <th>Updates</th>
                        <th>Status</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                {claims
                    
                    .map( (claim, index)  => {
                    return <ClaimSearchTableRow key={index} id={claim.id} policyNumber={claim.policyNumber} insuranceType={claim.insuranceType} surname={claim.surname} 
                    updates={claim.updates} status={claim.status} details/> })}
                </tbody>
            </table>
        }
        </>
    );
}

export default Claims;
