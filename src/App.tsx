import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import DataPage from "./pages/DataPage";
import ErrorPage from "./pages/ErrorPage";
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/database" element={<DataPage />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
