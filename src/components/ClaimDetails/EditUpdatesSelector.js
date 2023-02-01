import { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { getUpdates } from '../../data/DataFunctions';;

const EditUpdatesSelector = (props) => {

    useEffect( () => {
        loadUpdates();
    } , [props]);

    const [uniqueUpdates, setUniqueUpdates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const updatesInRedux = useSelector( state => state.updates);
    const timeOfLastFetch = useSelector( state => state.lastFetch);
    const dispatch = useDispatch();

    const loadUpdates = () => {

        if(updatesInRedux.length > 0 && new Date().getTime() - timeOfLastFetch < 60000) {
            console.log("using updates from redux");
            setUniqueUpdates(updatesInRedux);
            setIsLoading(false);
        }
        
        else {
            console.log("getting updates via rest");
            getUpdates()
            .then ( response => {
                if (response.status === 200) {
                    setUniqueUpdates(response.data);
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
            setSelectedUpdate(props.value);
        }

        if (props.defaultValue != null) {
            setDefaultSelectedUpdate(props.value);
        }
    }



    const [selectedUpdate, setSelectedUpdate] = useState("");
    const [defaultSelectedUpdate, setDefaultSelectedUpdate] = useState("");
    console.log(props.defaultValue);

    const changeUpdates = (event) => {
        const update = event.target.value;
        props.changeUpdates(update);
    }


    return (<>
        <label htmlFor="reason">Updates Selector *</label>
        <select onChange={changeUpdates} defaultValue={defaultSelectedUpdate}>
            <option value="" disabled={true}> ---select---</option>
            {uniqueUpdates.map (update => <option key={update} value={update}>{update}</option>)}
        </select>
    </>)
}

export default EditUpdatesSelector;