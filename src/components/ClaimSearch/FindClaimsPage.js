import Claims from "./Claims";
import {useParams} from 'react-router-dom';
import { useEffect } from "react";

const FindClaimsPage = (props) => {

const params = useParams();

useEffect( ()=> {
    if (params.policyNumber != null && params.policyNumber !== props.searchTerm) {
        props.setSearchTerm(props.searchTerm);
    }
} , [params.policyNumber]);

return (

        <div className="container">
            <div className="text-center">
                <h1>Search results for: {props.searchTerm}</h1>
            </div>

            <Claims searchTerm={props.searchTerm}  />
        </div>

    );
}

export default FindClaimsPage;