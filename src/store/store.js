import { configureStore } from "@reduxjs/toolkit";

const initialState = {
    updates : [],
    lastFetch : null,
    currentUser : {}
}

const reducer = (state = initialState, action) => {
    if (action.type === "updateUpdates") {
        return {...state, countries : action.value, lastFetch: new Date().getTime() }
    } 
    if (action.type === "logout") {
        return {...state, currentUser : {}}
    }
    return state;
}

const store = configureStore({reducer : reducer});
export default store;