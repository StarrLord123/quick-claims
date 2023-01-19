import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const currentUser = useContext(UserContext);
    
    const navigate = useNavigate();

    const updateUsername = (event) => {
        setUsername(event.target.value);
    }

    const updatePassword = (event) => {
        setPassword(event.target.value);
    }

    const submitForm = (event) => {
        event.preventDefault();
        //simualte a rest call to do the login
        
        currentUser.setUser({name : username, role : "admin"});

        navigate("/");
    }

    return (
    <div>
        <div className="container">
            <div className="text-center">
                    <h1>Log In</h1>
                </div>
            <div className="container form card rounded shadow p-3">
                <form onSubmit={submitForm} >
                    <label htmlFor="name">Username*</label>
                    <input id="name" type="text" value={username} onChange={updateUsername} />
                    <label htmlFor="password">Password*</label>
                    <input id="password" type="password" value={password} onChange={updatePassword} />
                    <button className="button" type="submit">Login</button>
                </form>
            </div>
        </div>
    </div>)


}

export default Login;