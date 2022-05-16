import { createContext, useState, useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";

//import pages
import MALAuthTest from "./testpages/MALAuthTest";
import MALAuthTest2 from "./testpages/MALAuthTest2";
import UserTestTest from "./testpages/UserTestTest";
import SearchBarProto from "./testpages/SearchBarTest";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import About from "./pages/About";
import CompareUser from "./pages/Friends";
import Contact from "./pages/Contact";
import FindUser from "./pages/FindUser";
import Nav from "./components/Nav";

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

const ProtectedRoute = ({ user, children }) => {
  if (user === false) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const query = useQuery();

  const [userData, setUserData] = useState({
    code_challenge: "bo0UcvCfQD9npT8Sg55wUFEBEZYoTYSqGYXsUzTo8XfpsStmKP96PeH4SlQ2GIrA5Qdz_2cwKxbNxRpLr6EVuyYmI5S_qvX1yMPEbRkYtgFg8HCwYO9ykLLT09GU1D20",
    user: null,
  });

  const value = { userData, setUserData };

  const [authed, setAuthed] = useState(false);
  const login = () => {
    setAuthed(true);
  }
  const logout = () => {
    setAuthed(false);
  }

  return (
    <UserContext.Provider value={value}>

      <Routes>
        <Route exact path="/" element={<LandingPage code={query.get("code")} handleLogin={login}/>} />
        <Route path="/home" element={
          <ProtectedRoute user={authed}>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/list" element={
          <ProtectedRoute user={authed}>
            <ListPage />
          </ProtectedRoute>
        } />
        <Route path="/friends" element={
          <ProtectedRoute user={authed}>
            <CompareUser />
          </ProtectedRoute>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/find-user" element={
          <ProtectedRoute user={authed}>
            <FindUser />
          </ProtectedRoute>
        } />
        <Route path="*" element={<p>404: page doesn't exist!</p>} />


        {/* Test Routes */}
        <Route path="/session" element={<MALAuthTest code={query.get("code")}/>} />
        <Route path="/auth" element={<MALAuthTest2 code={query.get("code")}/>} />
        <Route path="/usertest" element={<UserTestTest />} />
        <Route path="/search" element={<SearchBarProto />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;