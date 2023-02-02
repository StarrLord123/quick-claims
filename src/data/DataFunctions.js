import axios from "axios";

const headers = new Headers({"Accept" : "application/json"})

// const getAuthHeader = (username, password) => {
//     return {"Authorization" : "Basic " + btoa(`${username}:${password}`)}
// }

export const getAllClaimsFetchVersion = () => { 
    return fetch ("http://localhost:8080/api/claim", 
         {
            method: "GET",
            headers : headers          
        }
    )
}

export const getAllClaimsAxiosVersion  = () => {
    return axios({url : "http://localhost:8080/api/claim",
            method: "GET", 
            headers: {"Accept" : "application/json"}
            })
}

export const getAllClaimsForStatus = (status) => {
    console.log("getallclaimsforstatus", status)
    return axios({url : "http://localhost:8080/api/claim?status="+status,
            method: "GET", 
            headers: {"Accept" : "application/json"}
            })
}

export const getAllClaimsForPolicyNumber  = (policyNumber) => {
    return axios({url : "http://localhost:8080/api/claim?policyNumber="+policyNumber,
            method: "GET", 
            headers: {"Accept" : "application/json"}
            })
}

export const getClaimById  = (id) => {
    return axios({url : "http://localhost:8080/api/claim/"+id,
            method: "GET", 
            headers: {"Accept" : "application/json"}
            })
}

export const getAllStatuses = ()  => {
    console.log("getstatuses")
    return axios({url : "http://localhost:8080/api/status",
            method: "GET", 
            headers: {"Accept" : "application/json"}
            })
}

export const addNewClaim = (claim) => {
    return axios({url : "http://localhost:8080/api/claim",
                    method: "POST",
                    headers: {"Accept" : "application/json", "Content-Type": "application/json"},
                    data : claim
                })
}

export const updateClaim = (claim) => {
    return axios({url : "http://localhost:8080/api/claim/"+claim.id,
                    method: "PUT",
                    headers: {"Accept" : "application/json", "Content-Type": "application/json"},
                    data : claim
                })
}

// export const login = (username, password) => {
//     return axios({url : "http://localhost:8080/api/login",
//                     method: "POST",
//                     headers: {...getAuthHeader(username,password),
//                          "Accept" : "application/json", "Content-Type": "application/json"},
//                          data: {username: username}
//                     });
// }