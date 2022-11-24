import { NavLink } from "react-bootstrap";

const Menu = () => {
    return (
    <div>
        <div class="container bg-light heading d-flex flex-row justify-content-between align-items-center">
            <div>
                <h1>SpeedyClaims</h1>
            </div>
            <div>
                <button class="button">LOG OUT</button>
            </div>
        </div>
        <div class="container bg-black heading d-flex flex-row justify-content-between align-items-left">
            <div>
                <button class="button"><NavLink to="/newclaim">NEW CLAIM</NavLink></button>
            </div>
            <div>
                <button class="button">OPEN CLAIMS</button>
            </div>
            <div>
                <button class="button"><NavLink to="/search">SEARCH</NavLink></button>
            </div>
            <div>
                <button class="button">ARCHIVE</button>
            </div>
        </div>
    </div>);
}

export default Menu;