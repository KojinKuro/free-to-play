import "normalize.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import "react-loading-skeleton/dist/skeleton.css";
import "react-multi-carousel/lib/styles.css";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App.tsx";
import "./main.css";
import ErrorPage from "./pages/error/page.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
