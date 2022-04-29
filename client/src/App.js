import { Route, Routes, useLocation } from "react-router-dom";

//import pages
import RecordList from "./components/recordList";
import MALAuthTest from "./testpages/MALAuthTest";
import HomePage from "./pages/HomePage";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const App = () => {
  const query = useQuery();

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/auth" element={<MALAuthTest />} />
        <Route path="/home" element={<HomePage code={query.get("code")} state={query.get("state")}/>} />
      </Routes>
    </div>
  );
}

export default App;