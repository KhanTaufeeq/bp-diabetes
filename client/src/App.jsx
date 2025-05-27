import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Register from "./Register";
import Signin from "./Signin";
import Sugar from "./Sugar";
import BP from "./Bp";
import EditBP from "./EditBP";
import EditSugar from "./EditSugar";
import { HealthDataProvider } from "./HealthDataContext";
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return <Navigate to="/signin" />;
  }
  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp < Date.now() / 1000) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userName');
      return <Navigate to='/signin' replace/>
    }
  } catch (error) {
    console.log(error);
    return <Navigate to='/signin' replace/>
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
                  <Sugar isDashBoard={false}/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/bp"
              element={
                <ProtectedRoute>
                  <BP isDashBoard={false}/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/editBp"
              element={
                <ProtectedRoute>
                  <EditBP/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/editSugar"
              element={
                <ProtectedRoute>
                  <EditSugar/>
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
