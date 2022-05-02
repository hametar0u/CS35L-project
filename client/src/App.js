import { createContext, useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

//import pages
import RecordList from "./components/recordList";
import MALAuthTest from "./testpages/MALAuthTest";
import MALAuthTest2 from "./testpages/MALAuthTest2";
import HomePage from "./pages/HomePage";
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5001';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};


export const UserContext = createContext({
  userData: {
    code_challenge: "",
    user: null,
    tokens: null
  },
  setUserData: () => {}
});

const App = () => {
  const query = useQuery();

  const [userData, setUserData] = useState({
    code_challenge: "",
    user: null,
    tokens: null
  });

  const value = { userData, setUserData };

  const getCodeVerifier = async() => {
    const response = await axios.get("/auth/get-code-verifier");
    const json = await response.data;
    setUserData({
      ...userData,
      code_challenge: json.code_challenge
    });
  }

  useEffect(() => {
    getCodeVerifier();
  });

  // const value = {code_challenge: code_challenge};

  return (
    <UserContext.Provider value={value}>
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        {/* <Route path="/auth" element={<MALAuthTest2 code={query.get("code")}/>} /> */}
        <Route path="/auth" element={<MALAuthTest code={query.get("code")}/>} />
        <Route path="/redirect" element={<MALAuthTest2 code={query.get("code")}/>} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;