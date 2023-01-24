import axios from "axios";

export const getAllClaims = () => {
    return [
        {policyNumber: 101, insuranceType: "Property", title: "Mr", forename: "John", surname: "Smith", amount: 100, propertyAddress: "1 fake street", reason: "House burnt down", updates: "New Claim", status: "Open"},
        {policyNumber: 102, insuranceType: "Motor", title: "Mr", forename: "Arnold", surname: "Smithy", amount: 100, vehicleMake: "Ford", vehicleModel: "Fiesta", vehicleYear: "2000", reason: "Car on fire", updates: "Assessed", status: "Open"},
        {policyNumber: 103, insuranceType: "Pet", title: "Ms", forename: "Barbara", surname: "Johnson", amount: 100, animalType: "Dog", animalBreed: "Westie", reason: "Pet hurt leg", updates: "Rejected", status: "Closed"},
        {policyNumber: 104, insuranceType: "Property", title: "Mr", forename: "Donald", surname: "Williams", amount: 100, propertyAddress: "2 fake street", reason: "House burnt down", updates: "Accepted - Awaiting Payment", status: "Open"},
        {policyNumber: 105, insuranceType: "Motor", title: "Ms", forename: "Emma", surname: "Brown", amount: 100, vehicleMake: "Volkswagen", vehicleModel: "Polo", vehicleYear: "2010", reason: "Car broke down", updates: "Accepted - Paid", status: "Closed"},
        {policyNumber: 106, insuranceType: "Pet", title: "Ms", forename: "Francine", surname: "Jones", amount: 100, animalType: "Cat", animalBreed: "Tabby", reason: "Pet hurt leg", updates: "Rejected", status: "Closed"},
        {policyNumber: 107, insuranceType: "Property", title: "Mr", forename: "Harold", surname: "Garcia", amount: 100, propertyAddress: "3 fake street", reason: "House burnt down", updates: "Rejected", status: "Closed"},
        {policyNumber: 108, insuranceType: "Motor", title: "Ms", forename: "Jane", surname: "Miller", amount: 100, vehicleMake: "Volkswagen", vehicleModel: "Golf", vehicleYear: "2020", reason: "Car broke down", updates: "Assessed", status: "Open"},
        {policyNumber: 109, insuranceType: "Pet", title: "Mr", forename: "Keith", surname: "David", amount: 100, animalType: "Dog", animalBreed: "Labradoodle", reason: "Pet hurt leg", updates: "Accepted - Awaiting Payment", status: "Open"},
        {policyNumber: 110, insuranceType: "Property", title: "Ms", forename: "Laura", surname: "Stephens", amount: 100, propertyAddress: "4 fake street", reason: "House burnt down", updates: "Accepted - Paid", status: "Closed"}
    ]
}

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

// export const getAllClaimsForUpdates = (updates) => {
//     console.log("getallpaymentsforupdates")
//     return axios({url : "http://localhost:8080/api/claim?updates="+updates,
//             method: "GET", 
//             headers: {"Accept" : "application/json", ...getAuthHeader(username, password)}
//             })
// }

export const getAllClaimsForPolicyNumber  = (policyNumber) => {
    return axios({url : "http://localhost:8080/api/claim?policyNumber="+policyNumber,
            method: "GET", 
            headers: {"Accept" : "application/json"}
            })
}

export const getUpdates = ()  => {
    console.log("getupdates")
    return axios({url : "http://localhost:8080/api/updates",
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

// export const login = (username, password) => {
//     return axios({url : "http://localhost:8080/api/login",
//                     method: "POST",
//                     headers: {...getAuthHeader(username,password),
//                          "Accept" : "application/json", "Content-Type": "application/json"},
//                          data: {username: username}
//                     });
// }