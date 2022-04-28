import { Route, Routes } from "react-router-dom";

import RecordList from "./components/recordList";
import MALAuthTest from "./testpages/MALAuthTest";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/auth" element={<MALAuthTest />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;