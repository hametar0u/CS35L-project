import { createContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

//import pages
import RecordList from "./components/recordList";
import MALAuthTest from "./testpages/MALAuthTest";
import HomePage from "./pages/HomePage";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const UserContext = createContext();

// GENERATING CODE VERIFIER
const dec2hex = (dec) => {
  return ("0" + dec.toString(16)).substr(-2);
}
const generateCodeVerifier = () => {
  var array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}

const App = () => {
  const query = useQuery();
  
  const code_challenge = generateCodeVerifier();

  const value = {code_challenge: code_challenge};

  return (
    <UserContext.Provider value={value}>
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/auth" element={<MALAuthTest />} />
        <Route path="/home" element={<HomePage code={query.get("code")} state={query.get("state")}/>} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;