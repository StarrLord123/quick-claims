import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import ClaimSearch from './components/ClaimSearch/ClaimSearch';

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



