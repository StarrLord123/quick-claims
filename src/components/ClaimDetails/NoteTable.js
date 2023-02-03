import './NoteTable.css';
import {getAllClaimsAxiosVersion, getAllNotesForClaim} from '../../data/DataFunctions';
import NoteTableRow from "./NoteTableRow";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useParams } from "react-router-dom";

const NoteTable = (props) => {

    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const currentUser = useContext(UserContext);

    const params = useParams();
    const claimId = params.id;

    useEffect( () => {
        if(notes.length === 0) {
            setIsLoading(true);
            getAllNotesForClaim(+claimId, currentUser.user.name, currentUser.user.password)
                .then( response => {
                        setNotes(response.data);
                        setIsLoading(false);
                } )
                .catch ( error => {
                    console.log("something went wrong", error);
                })
        }
        else {loadData();}
    }, []  );


    const loadData = () => {
        getAllNotesForClaim(+claimId, currentUser.user.name, currentUser.user.password)
            .then ( response => {
                if (response.status === 200) {
                    setIsLoading(false);
                    setNotes(response.data);
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
            <table className="noteTable table table-striped table-responsive">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Claim Id</th>
                        <th>Completed</th>
                        <th>Date</th>
                        <th>Note</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {notes
                    
                    .map( (note, index)  => {
                    return <NoteTableRow key={index} id={note.id} claimId={note.claimId} completed={note.completed} date={note.date} 
                    note={note.note} details/> })}
                </tbody>
            </table>
        }
        </>
    );
}

export default NoteTable;
