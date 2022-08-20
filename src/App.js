import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./UserOnBoard/SignIn";
import SignUp from "./UserOnBoard/SignUp";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
