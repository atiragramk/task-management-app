import { lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Layout } from "./components/Layout";
import { authStateSelector } from "./pages/Auth/selectors/auth";
import { registerStateSelector } from "./pages/Register/selectors/register";

const Home = lazy(() => import("./pages/Home"));
const Board = lazy(() => import("./pages/Board"));
const Projects = lazy(() => import("./pages/Projects"));
const Auth = lazy(() => import("./pages/Auth"));
const Register = lazy(() => import("./pages/Register"));
const Page404 = lazy(() => import("./pages/Page404"));

function App() {
  const { token } = useSelector(authStateSelector);

  const data = useSelector(registerStateSelector);

  console.log(token);

  useEffect(() => {
    const saveToken = () => {
      if (token) {
        localStorage.setItem("token", token);
      }
    };

    window.addEventListener("beforeunload", saveToken);

    return () => {
      window.removeEventListener("beforeunload", saveToken);
    };
  }, [token]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="/projects"
              element={token ? <Projects /> : <Navigate to="/login" />}
            />
            <Route
              path="/projects/:routeId"
              element={token ? <Board /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={token ? <Navigate to="/" /> : <Auth />}
            />
            <Route
              path="/register"
              element={
                Object.entries(data).length ? (
                  <Navigate to="/login" />
                ) : (
                  <Register />
                )
              }
            />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
}

export default App;
