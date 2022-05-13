import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext";

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5001'; //TODO: change to production link but might have to deal with SSL crap

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);