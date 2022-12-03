import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import SignupAppWrite from "./appwrite_auth/SignupAppWrite";
import LoginAppWrite from "./appwrite_auth/LoginAppWrite";
import TodoHomepage from "./todo_app/TodoHomepage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupAppWrite />} />
        <Route path="/login" element={<LoginAppWrite />} />
        <Route path="/homepage/:sessionId" element={<TodoHomepage/>} />
      </Routes>
    </Router>
  );
}

export default App;
