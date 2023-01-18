import { Outlet, NavLink } from "react-router-dom";
import "../App.css";
import Footer from "./Footer/Footer";
import QuickClaims from "./Images/QuickClaims.png"
import MenuImage from "./Images/MenuImage.png"

const Menu = () => 
{
    return (
    <div>
        <div className="container logo">
            <img className="quickClaimsLogo" src={QuickClaims} alt="Quick Claims Logo"></img>
        </div>
        <nav>
            <div className="container menu bg-black heading d-flex flex-row justify-content-between align-items-left">

                <button className="button"><NavLink to="/addclaim">ADD CLAIM</NavLink></button>
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