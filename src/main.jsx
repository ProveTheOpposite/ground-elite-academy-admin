import React from "react";
import ReactDOM from "react-dom/client";
// Router
import { BrowserRouter as Router } from "react-router-dom";
// recoil
import { RecoilRoot } from "recoil";
// component
import App from "./components/App/";
// style
import "./assets/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <App />
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
);
