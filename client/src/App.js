import { createContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

//import pages
import RecordList from "./components/recordList";
import MALAuthTest from "./testpages/MALAuthTest";
import MALAuthTest2 from "./testpages/MALAuthTest2";
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

  // const value = {code_challenge: code_challenge};
  const value = {code_challenge: "bo0UcvCfQD9npT8Sg55wUFEBEZYoTYSqGYXsUzTo8XfpsStmKP96PeH4SlQ2GIrA5Qdz_2cwKxbNxRpLr6EVuyYmI5S_qvX1yMPEbRkYtgFg8HCwYO9ykLLT09GU1D20"};

  return (
    <UserContext.Provider value={value}>
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        {/* <Route path="/auth" element={<MALAuthTest2 code={query.get("code")}/>} /> */}
        <Route path="/auth" element={<MALAuthTest code={query.get("code")}/>} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;