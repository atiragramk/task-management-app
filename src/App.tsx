import { Container } from "@mui/material";
import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Layout } from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Board = lazy(() => import("./pages/Board"));

function App() {
  return (
    <Router basename="/task-management">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/projects" element={<Home />} />
          <Route path="/board" element={<Board />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
