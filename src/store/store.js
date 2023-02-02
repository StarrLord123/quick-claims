import { configureStore } from "@reduxjs/toolkit";

const initialState = {
    statuses : [],
    lastFetch : null,
    currentUser : {}
}

const reducer = (state = initialState, action) => {
    if (action.type === "updateStatuses") {
        return {...state, statuses : action.value, lastFetch: new Date().getTime() }
    } 
    if (action.type === "logout") {
        return {...state, currentUser : {}}
    }
    return state;
}

const store = configureStore({reducer : reducer});
export default store;