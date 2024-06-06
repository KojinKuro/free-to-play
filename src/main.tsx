import "normalize.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "react-loading-skeleton/dist/skeleton.css";
import "react-multi-carousel/lib/styles.css";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App.tsx";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
