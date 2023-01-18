export const getAllClaims = () => {
    return [
        {policyNumber: 101, insuranceType: "Property", title: "Mr", forename: "John", surname: "Smith", amount: 100, propertyAddress: "1 fake street", reason: "House burnt down", updates: "New Claim", status: "Open"},
        {policyNumber: 102, insuranceType: "Motor", title: "Mr", forename: "Arnold", surname: "Smithy", amount: 100, vehicleMake: "Ford", vehicleModel: "Fiesta", vehicleYear: "2000", reason: "Car on fire", updates: "Assessed", status: "Open"},
        {policyNumber: 103, insuranceType: "Pet", title: "Mr", forename: "Barbara", surname: "Johnson", amount: 100, animalType: "Dog", animalBreed: "Westie", reason: "Pet hurt leg", updates: "Rejected", status: "Closed"},
        {policyNumber: 104, insuranceType: "Property", title: "Mr", forename: "Donald", surname: "Williams", amount: 100, propertyAddress: "2 fake street", reason: "House burnt down", updates: "Accepted - Awaiting Payment", status: "Open"},
        {policyNumber: 105, insuranceType: "Motor", title: "Mr", forename: "Emma", surname: "Brown", amount: 100, vehicleMake: "Volkswagen", vehicleModel: "Polo", vehicleYear: "2010", reason: "Car broke down", updates: "Accepted - Paid", status: "Closed"},
        {policyNumber: 106, insuranceType: "Pet", title: "Mr", forename: "Francine", surname: "Jones", amount: 100, animalType: "Cat", animalBreed: "Tabby", reason: "Pet hurt leg", updates: "Rejected", status: "Closed"},
        {policyNumber: 107, insuranceType: "Property", title: "Mr", forename: "Harold", surname: "Garcia", amount: 100, propertyAddress: "3 fake street", reason: "House burnt down", updates: "Rejected", status: "Closed"},
        {policyNumber: 108, insuranceType: "Motor", title: "Mr", forename: "Jane", surname: "Miller", amount: 100, vehicleMake: "Volkswagen", vehicleModel: "Golf", vehicleYear: "2020", reason: "Car broke down", updates: "Assessed", status: "Open"},
        {policyNumber: 109, insuranceType: "Pet", title: "Mr", forename: "Keith", surname: "David", amount: 100, animalType: "Dog", animalBreed: "Labradoodle", reason: "Pet hurt leg", updates: "Accepted - Awaiting Payment", status: "Open"},
        {policyNumber: 110, insuranceType: "Property", title: "Mr", forename: "Laura", surname: "Stephens", amount: 100, propertyAddress: "4 fake street", reason: "House burnt down", updates: "Accepted - Paid", status: "Closed"}
    ]
}