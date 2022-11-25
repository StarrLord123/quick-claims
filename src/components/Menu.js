import { Outlet, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Footer from "./Footer/Footer";

const Menu = () => 
{
    const style = ({ isActive }) => ({
        fontWeight: isActive ? 'bold' : 'normal',
    })

    return (
    <div>
        <div className="container bg-light heading d-flex flex-row justify-content-between align-items-center">
            <div>
                <h1>SpeedyClaims</h1>
            </div>
            <div>
                <button className="button">LOG OUT</button>
            </div>
        </div>
        <nav>
            <div className="container bg-black heading d-flex flex-row justify-content-between align-items-left">
                <button className="button"><NavLink to="/newclaim">NEW CLAIM</NavLink></button>
                <button className="button"><NavLink to="/openclaims">OPEN CLAIMS</NavLink></button>
                <button className="button"><NavLink to="/claimsearch">SEARCH CLAIMS</NavLink></button>
            </div>
        </nav>
        <main>
            <Outlet />
        </main>
        <Footer />
    </div>);
}

export default Menu;