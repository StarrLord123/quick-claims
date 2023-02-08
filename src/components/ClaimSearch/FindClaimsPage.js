import Claims from "./Claims";
import {useParams} from 'react-router-dom';
import { useEffect } from "react";

const FindClaimsPage = (props) => {

    const params = useParams();
    console.log(params.id)
    console.log(props.searchTerm)

    useEffect( ()=> {
        if (params.id != null && params.id !== props.searchTerm) {
            props.setSearchTerm(props.searchTerm);
        }
    } , [params.id]);

    useEffect ( () => {
        if (params.id != null) {
            props.setSearchTerm(params.id)
        }
    } , []);

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