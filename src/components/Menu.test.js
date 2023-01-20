import {render, screen} from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Menu from "./Menu";

test("menu contains a link to the find page", ()=> {
    //step1 - render the component
    render(<BrowserRouter><Menu /></BrowserRouter>);

    //step2 - get the object we want to inspect
    const findLink = screen.getByText("SEARCH CLAIMS", {exact: false});

    //step3 - user interaction (click / type)

    //step4 - what do we expect to happen
    expect(findLink).toBeInTheDocument();
    expect(findLink).toHaveAttribute('href', '/claimsearch');

})