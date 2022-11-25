import { Routes, Route, Outlet, NavLink } from "react-router-dom";

import Menu from './components/Menu';
import Welcome from "./components/Welcome";
import NewClaim from './components/NewClaim';
import OpenClaims from './components/OpenClaims/OpenClaims';
import ClaimSearch from './components/ClaimSearch/ClaimSearch';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <Routes> 
      <Route element = {<Menu />}>
        <Route index element={<Welcome/>} />
          <Route path="/newclaim" element={<NewClaim/>} />
          <Route path="/openclaims" element={<OpenClaims/>} />
          <Route path="/claimsearch" element={<ClaimSearch />} />
      </Route>
    </Routes>
  );
};

export default App;
