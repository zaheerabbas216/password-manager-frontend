import logo from "./logo.svg";
import "./App.css";
import { Routes, Router, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import PasswordInfo from "./Pages/PasswordInfo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details" element={<PasswordInfo />} />
      </Routes>
    </div>
  );
}

export default App;
