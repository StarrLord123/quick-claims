import { Routes, Route } from "react-router-dom";
import {useState} from "react";
import { Provider } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from './components/Menu';
import Welcome from "./components/Welcome";
import AddClaim from './components/AddClaim/AddClaim';
import OpenClaims from './components/OpenClaims/OpenClaims';
import ClaimSearch from './components/ClaimSearch/ClaimSearch';
import ClaimDetails from "./components/ClaimDetails/ClaimDetails";
import EditClaim from "./components/ClaimDetails/EditClaim";
import FindClaimsPage from "./components/ClaimSearch/FindClaimsPage";
import Login from "./components/Login";
import { UserContext } from "./components/contexts/UserContext";
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {

  const [searchTerm, setSearchTerm] = useState("");

  const [currentUser, setCurrentUser] = useState({ name : "", role : ""});

  return (
    <BrowserRouter>
        <Provider store={store} >
            <UserContext.Provider value={{user:currentUser, setUser:setCurrentUser }}>
                <Routes> 
                <Route element = {<Menu />}>
                    <Route index element={<Welcome/>} />
                    <Route path="/login" element = {<Login />} />
                    <Route path="/addclaim" element={
                        <ProtectedRoute path="addclaim" roles={["MANAGER"]} element = {<AddClaim/>} />} />
                    <Route path="/openclaims" element={
                        <ProtectedRoute path="openclaims" roles={["USER", "MANAGER"]} element = {<OpenClaims/>} />} />
                    <Route path="/claimsearch" element={
                        <ProtectedRoute path="claimsearch" roles={["USER", "MANAGER"]} element = {
                        <ClaimSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} /> } />
                    <Route path="/claimsearch/:id" element={
                        <ProtectedRoute path="claimsearch" roles={["USER", "MANAGER"]} element = {
                        <FindClaimsPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} /> } />
                    <Route path="/claim/:id" element={
                        <ProtectedRoute path="claim" roles={["USER", "MANAGER"]} element = {<ClaimDetails/>} />} />
                    <Route path="/edit/:id" element={
                        <ProtectedRoute path="edit" roles={["MANAGER"]} element = {<EditClaim/>} />} />
                    <Route path="*" element = { <div className="container"><h1>Sorry - that page doesn't exist</h1></div>}/>
                </Route>
                </Routes>
            </UserContext.Provider>
        </Provider>
    </BrowserRouter>
  );
};

export default App;
