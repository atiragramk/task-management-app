import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Layout } from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Board = lazy(() => import("./pages/Board"));
const Projects = lazy(() => import("./pages/Projects"));

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:routeId" element={<Board />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
}

export default App;
