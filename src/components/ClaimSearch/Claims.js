import './ClaimSearch.css';
import {getAllClaimsAxiosVersion, getAllClaimsForPolicyNumber} from '../../data/DataFunctions';
import ClaimSearchTableRow from "./ClaimSearchTableRow";
import { useEffect, useState } from 'react';

const Claims = (props) => {

    const [claims, setClaims] = useState([]);
    const [claimsSearch, setClaimsSearch] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        if(props.searchTerm !== "") {
            setIsLoading(true);
            
            getAllClaimsAxiosVersion()
                .then( response => {
                        setClaimsSearch(response.data);
                        setIsLoading(false);
                } )
                .catch ( error => {
                    console.log("something went wrong", error);
                })

            const claim = claimsSearch.filter((claim) => {
                return (
                    claim.policyNumber.toString().includes(props.searchTerm) ||
                    claim.insuranceType.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
                    claim.surname.toLowerCase().includes(props.searchTerm.toLowerCase())
                );
                });
            setClaims(claim);
        }
        else loadData();
    }, [props.searchTerm]  );


    const loadData = () => {
        getAllClaimsAxiosVersion()
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

    useEffect( ()=> {
            loadData();
            console.log(loadData())
        }, [] );

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
