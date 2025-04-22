import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Router } from './Router';
import Register from "./Register";
import Signin from "./Signin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
