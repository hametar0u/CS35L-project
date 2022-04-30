import { createContext, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

//import pages
import RecordList from "./components/recordList";
import MALAuthTest from "./testpages/MALAuthTest";
import MALAuthTest2 from "./testpages/MALAuthTest2";
import HomePage from "./pages/HomePage";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const UserContext = createContext({
  userData: {
    code_challenge: "bo0UcvCfQD9npT8Sg55wUFEBEZYoTYSqGYXsUzTo8XfpsStmKP96PeH4SlQ2GIrA5Qdz_2cwKxbNxRpLr6EVuyYmI5S_qvX1yMPEbRkYtgFg8HCwYO9ykLLT09GU1D20"
  },
  setUserData: () => {}
});

const App = () => {
  const query = useQuery();
  const [userData, setUserData] = useState({
    code_challenge: "bo0UcvCfQD9npT8Sg55wUFEBEZYoTYSqGYXsUzTo8XfpsStmKP96PeH4SlQ2GIrA5Qdz_2cwKxbNxRpLr6EVuyYmI5S_qvX1yMPEbRkYtgFg8HCwYO9ykLLT09GU1D20"
  });
  const value = { userData, setUserData };


  // const value = {code_challenge: code_challenge};

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