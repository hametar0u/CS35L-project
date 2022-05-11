import { createContext, useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

//import pages
import RecordList from "./components/recordList";
import MALAuthTest from "./testpages/MALAuthTest";
import MALAuthTest2 from "./testpages/MALAuthTest2";
import UserTestTest from "./testpages/UserTestTest";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import About from "./pages/About";
import CompareUser from "./pages/Friends";
import Contact from "./pages/Contact";
import FindUser from "./pages/FindUser";

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
  });

  const value = { userData, setUserData };

  const getCodeVerifier = async () => {
    const response = await axios.get("/auth/v2/get-code-verifier");
    const json = await response.data;
    setUserData({
      ...userData,
      code_challenge: json.code_challenge
    });
  };

  const getLoginStatus = async () => {
    const response = await axios.get("/auth/v2/get-login-status", {
      withCredentials: true,
    });
    const json = await response.data;
    setUserData({
      ...userData,
      login_status: json
    });
  };

  useEffect(() => {
    getCodeVerifier();
    getLoginStatus();
  });

  return (
    <UserContext.Provider value={value}>
      <Routes>
        <Route exact path="/" element={<LandingPage code={query.get("code")}/>} />
        <Route path="/home" element={< HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/friends" element={<CompareUser />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/find-user" element={<FindUser />} />
        <Route path="*" element={<LandingPage />} />


        {/* Test Routes */}
        <Route path="/session" element={<MALAuthTest code={query.get("code")}/>} />
        <Route path="/auth" element={<MALAuthTest2 code={query.get("code")}/>} />
        <Route path="/usertest" element={<UserTestTest />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;