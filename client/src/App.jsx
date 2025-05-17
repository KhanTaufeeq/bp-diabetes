import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Register from "./Register";
import Signin from "./Signin";
import Sugar from "./Sugar";
import BP from "./Bp";
import { HealthDataProvider } from "./HealthDataContext";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return <Navigate to="/signin" />;
  }
  return children;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <HealthDataProvider>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/signin" element={<Signin />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sugar"
              element={
                <ProtectedRoute>
                  <Sugar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bp"
              element={
                <ProtectedRoute>
                  <BP />
                </ProtectedRoute>
              }
            />
          </Routes>
        </HealthDataProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
