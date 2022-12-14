import { Routes, Route } from "react-router-dom";
import {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from './components/Menu';
import Welcome from "./components/Welcome";
import AddClaim from './components/AddClaim/AddClaim';
import OpenClaims from './components/OpenClaims/OpenClaims';
import ClaimSearch from './components/ClaimSearch/ClaimSearch';
import ClaimDetails from "./components/ClaimDetails";
import FindClaimsPage from "./components/ClaimSearch/FindClaimsPage";

const App = () => {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Routes> 
      <Route element = {<Menu />}>
        <Route index element={<Welcome/>} />
          <Route path="/addclaim" element={<AddClaim/>} />
          <Route path="/openclaims" element={<OpenClaims/>} />
          <Route path="/claimsearch" 
              element={<ClaimSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          <Route path="/claimsearch/:policyNumber" 
              element={<FindClaimsPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          <Route path="/claim/:policyNumber" element={<ClaimDetails/>} />
          <Route path="*" element = { <div className="container"><h1>Sorry - that page doesn't exist</h1></div>}/>
      </Route>
    </Routes>
  );
};

export default App;
