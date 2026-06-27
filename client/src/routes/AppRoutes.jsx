import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Interview from "../pages/Interview";
import ResumeUpload from "../pages/ResumeUpload";
import History from "../pages/History";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";

const AppRoutes = () => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  return (
    <BrowserRouter>

      <Routes>

        {/* DEFAULT */}
        <Route
          path="/"
          element={
            userInfo ? (
              <Dashboard />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />

        {/* AUTH */}
        <Route
          path="/signup"
          element={
            !userInfo ? (
              <Signup />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/login"
          element={
            !userInfo ? (
              <Login />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* PROTECTED */}
        <Route
          path="/interview"
          element={
            userInfo ? (
              <Interview />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/resume"
          element={
            userInfo ? (
              <ResumeUpload />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        

        <Route
          path="/analytics"
          element={
            userInfo ? (
              <Analytics />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;