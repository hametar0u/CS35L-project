import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

//constants
import { LOCAL } from "./hooks/constants";

import axios from 'axios';
if (LOCAL) {
  axios.defaults.baseURL = 'https://our-anime-list-beta.herokuapp.com/';
} else {
  axios.defaults.baseURL = 'https://our-anime-list-beta.herokuapp.com/';
}

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);