import './AddNoteTable.css'
import { getAllNotesForClaim, saveNotes } from '../../data/DataFunctions';
import { React, useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function AddNoteTable(props) {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const currentUser = useContext(UserContext);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

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

    const addNote = () => {
        setNotes([...notes, newNote]);
        setNewNote({});
    };

    const handleChange = (e, index) => {
        let notesCopy = [...notes];
        notesCopy[index][e.target.name] = e.target.value;
        setNotes(notesCopy);
      };

    const handleSubmit = (event) => {
        setMessage("Saving...");
        event.preventDefault();

        console.log("New note", newNote)

        let notesToSave = [...notes];
        if (Object.keys(newNote).length !== 0) {
            notesToSave.push(newNote);
        }

        console.log("The notes", notesToSave);
        
        saveNotes(+claimId, notesToSave, currentUser.user.name, currentUser.user.password)
            .then( response => {
                if (response.status === 200) {
                    setMessage("Notes for Claim " + +claimId + " have been updated at " + new Date().toLocaleTimeString());
                }
                else {
                    setMessage("Something went wrong - status code was " + response.status);
                }
                
            } )
            .catch( error => {
                setMessage("Something went wrong - " + error);
            })
        
        navigate(`/claim/${+claimId}`);
    } 

    const displayTime = () => {
        var date = new Date();
        document.getElementById("current-time").innerHTML = date.toLocaleString();
    }

    return <>
            {isLoading && <p style={{textAlign:"center"}} >Please wait... loading</p>}
            {!isLoading &&
            <table className="addNoteTable table table-striped table-responsive">
                <thead>
                        <tr>
                            <th>Note/Task</th>
                            <th>Date</th>
                            <th>Completed</th>
                            <th></th>
                        </tr>
                </thead>
                <tbody>
                    {notes.map((note, index) => {
                        return (
                            <tr className="addNoteTable table table-striped table-responsive" key={index}>
                                <td>
                                    <input
                                    type="text"
                                    name="note"
                                    value={note.note}
                                    onChange={(e) => handleChange(e, index)}
                                    id="note"
                                    disabled={note.completed === "Completed" || props.status === "rejected" || props.status === "accepted - paid"}
                                    />
                                </td>
                                <td>
                                    <input
                                    type="date"
                                    name="date"
                                    value={note.date}
                                    onChange={(e) => handleChange(e, index)}
                                    id="date"
                                    disabled={note.completed === "Completed" || props.status === "rejected" || props.status === "accepted - paid"}
                                    />
                                </td>
                                <td>
                                    <select id="completed" name="completed" value={note.completed} disabled={note.completed === "Completed" || props.status === "rejected" || props.status === "accepted - paid"} onChange={(e) => handleChange(e, index)}>
                                        <option value="" disabled={false}> ---select---</option>
                                        <option value="Not Completed">Task Not Completed</option>
                                        <option value="Completed">Task Completed</option>
                                        <option value="Note">Note</option>
                                    </select>
                                </td>
                                <td>
                                </td>
                            </tr>
                        );
                    })}

                        {<tr>
                            <td>
                            <input
                                type="text"
                                name="note"
                                value={newNote.note || ''}
                                disabled={props.status === "rejected" || props.status === "accepted - paid"}
                                onChange={e => setNewNote({ ...newNote, [e.target.name]: e.target.value })}
                                />
                            </td>
                            <td>
                            <input
                                type="date"
                                name="date"
                                value={newNote.date || ''}
                                disabled={props.status === "rejected" || props.status === "accepted - paid"}
                                onChange={e => setNewNote({ ...newNote, [e.target.name]: e.target.value })}
                            />
                            </td>
                            <td>
                                <select name="completed" value={newNote.completed || ''} disabled={props.status === "rejected" || props.status === "accepted - paid"} onChange={e =>setNewNote({ ...newNote, [e.target.name]: e.target.value })}>
                                    <option value="" disabled={false}> ---select---</option>
                                    <option value="Not Completed">Task Not Completed</option>
                                    <option value="Completed">Task Completed</option>
                                    <option value="Note">Note</option>
                                </select>
                            </td>

                            <td>
                            <button
                                className="button text-center"
                                disabled={props.status === "rejected" || props.status === "accepted - paid"}
                                onClick={addNote}>Add New Row
                            </button>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>}
            <button
                className="button text-center"
                disabled={props.status === "rejected" || props.status === "accepted - paid"}
                onClick={handleSubmit}>Save Notes
            </button>
            <div>{message}</div>
            
        </>;
}
export default AddNoteTable;