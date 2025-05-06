import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Register from "./Register";
import Signin from "./Signin";
import Sugar from "./Sugar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/signin" element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/sugar' element = {<Sugar/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
