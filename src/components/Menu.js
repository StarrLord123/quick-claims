import { Outlet, NavLink } from "react-router-dom";
import "../App.css";
import Footer from "./Footer/Footer";
import SpeedyClaims from "./Images/SpeedyClaims.png"
import { useContext } from 'react';
import { UserContext } from "./contexts/UserContext";

const Menu = () => 
{
    const currentUser = useContext(UserContext);

    const logout = () => {
        currentUser.setUser({name:"", role:""});
    }

    return (
    <div>
        {currentUser.user.name !== "" &&<div className="container menu heading d-flex flex-row justify-content-between align-items-left text-white">
            {currentUser.user.name !== "" && <p>Current user : {currentUser.user.name} Role: {currentUser.user.role}</p>}
        </div>}
        <div className="container logo">
            <NavLink to="/">
            <img className="speedyClaimsLogo" src={SpeedyClaims} alt="Quick Claims Logo"></img>
            </NavLink>
        </div>

        <nav>  
            <div className="container menu heading d-flex flex-row justify-content-between align-items-left">
                <button className="button"><NavLink className="nav-link" to="/addclaim" >ADD CLAIM</NavLink></button>
                <button className="button"><NavLink className="nav-link" to="/openclaims">OPEN CLAIMS</NavLink></button>
                <button className="button"><NavLink className="nav-link" to="/claimsearch">SEARCH CLAIMS</NavLink></button>
                {currentUser.user.name === "" && <button className="button"><NavLink className="nav-link" to="/login">LOG IN</NavLink></button>}
                {currentUser.user.name !== "" && <button className="button" onClick={logout}>LOG OUT</button>}
            </div>
        </nav>
        <main>
            <Outlet />
        </main>
        <Footer />
    </div>);
}

export default Menu;