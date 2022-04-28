import { Route, Routes } from "react-router-dom";

import RecordList from "./components/recordList";
import AuthTest from "./testpages/AuthTest";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/auth" element={<AuthTest />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;