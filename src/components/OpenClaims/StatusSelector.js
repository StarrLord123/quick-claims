import { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { getAllStatuses } from '../../data/DataFunctions';;

const StatusSelector = (props) => {

    useEffect( () => {
        loadStatuses();
    } , []);

    const [uniqueStatuses, setUniqueStatuses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const statusesInRedux = useSelector( state => state.statuses);
    const timeOfLastFetch = useSelector( state => state.lastFetch);
    const dispatch = useDispatch();

    const loadStatuses = () => {

        if(statusesInRedux.length > 0 && new Date().getTime() - timeOfLastFetch < 60000) {
            console.log("using statuses from redux");
            setUniqueStatuses(statusesInRedux);
            setIsLoading(false);
        }
        
        else {
            console.log("getting statuses via rest");
            getAllStatuses()
            .then ( response => {
                if (response.status === 200) {
                    setUniqueStatuses(response.data);
                    setIsLoading(false);
                }
                else {
                    console.log("something went wrong");
                }
            })
            .catch ( error => {
                console.log("something went wrong", error)
            })
        }

        if (props.value != null) {
            setSelectedStatus(props.value);
        }
    }

    const [selectedStatus, setSelectedStatus] = useState("");

    const changeStatus = (event) => {
        const status = event.target.value;
        props.changeStatus(status);
    }


    return (<>
        <label htmlFor="reason">Status Selector *</label>
        <select onChange={changeStatus} defaultValue={selectedStatus}>
            <option value="" disabled={false}> ---select---</option>
            {uniqueStatuses.map (status => <option key={status} value={status}>{status}</option>)}
        </select>
    </>)
}

export default StatusSelector;