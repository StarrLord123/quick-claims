import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import ClaimSearch from './ClaimSearch';

jest.mock("../../data/DataFunctions",  () => {
    return {
        getAllClaimsAxiosVersion : () => {
            return  Promise.resolve({status: 200, data : [{policyNumber: 101, insuranceType: "Property", title: "Mr", forename: "John", surname: "Smith", amount: 100, propertyAddress: "1 fake street", reason: "House burnt down", updates: "none", status: "New Claim"},
            {policyNumber: 102, insuranceType: "Motor", title: "Mr", forename: "Arnold", surname: "Smithy", amount: 100, vehicleMake: "Ford", vehicleModel: "Fiesta", vehicleYear: "2000", reason: "Car on fire", updates: "none", status: "Assessed"},
            {policyNumber: 103, insuranceType: "Pet", title: "Ms", forename: "Barbara", surname: "Johnson", amount: 100, animalType: "Dog", animalBreed: "Westie", reason: "Pet hurt leg", updates: "none", status: "Rejected"},
            {policyNumber: 104, insuranceType: "Property", title: "Mr", forename: "Donald", surname: "Williams", amount: 100, propertyAddress: "2 fake street", reason: "House burnt down", updates: "none", status: "Accepted - Awaiting Payment"},
            {policyNumber: 105, insuranceType: "Motor", title: "Ms", forename: "Emma", surname: "Brown", amount: 100, vehicleMake: "Volkswagen", vehicleModel: "Polo", vehicleYear: "2010", reason: "Car broke down", updates: "none", status: "Accepted - Paid"}]})
        },
    }
});

describe ("search box class is working", () => {

    test("check that the search box initially has no classes applied to it" , () => {
        render(
            <BrowserRouter>
                <ClaimSearch />
            </BrowserRouter>);
        const input = screen.getByLabelText("Search Term:");
        expect(input).not.toHaveClass("searchBoxError");
    }),
    
    test("check that the search box has the error class when the user enters just spaces" , () => {
        render(
        <BrowserRouter>
            <ClaimSearch />
        </BrowserRouter>);
        const input = screen.getByLabelText("Search Term:");
        userEvent.type(input, "   ");
        expect(input).toHaveClass("searchBoxError");
    }),

    test ("check that the search button is not enabled initially", () => {
        render(
            <BrowserRouter>
                <ClaimSearch />
            </BrowserRouter>);
        const buttons = screen.getAllByRole("button");
        const searchButton = buttons.find( b => b.textContent === "Search" );
        expect(searchButton).toBeDisabled();
    })
})



