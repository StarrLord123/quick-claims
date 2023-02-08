import { useContext, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { login } from "../data/DataFunctions";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [params, setParams] = useSearchParams();
    const target = params.get("target");

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
        login(username, password).then (
            result => {
                console.log(result)
                currentUser.setUser({name : result.data.username, role : result.data.role, password: password});
                target != null ? navigate("/" + target) : navigate("/");
            }
        )
        .catch( error => console.log("login didn't work"));
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