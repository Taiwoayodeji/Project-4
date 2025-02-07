import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";
import NavbarMenu from "./component/NavbarMenu/NavbarMenu";
import ListQuestions from "./component/ListQuestions/ListQuestions";
import "./styles/style.css";

function App() {
  const [user, setUser] = useState({
    user_id: null,
    user_name: "",
  });

  const handleSignOut = () => {
    setUser({
      user_id: null,
      user_name: "",
    });
  };

  return (
    <Router>
      <NavbarMenu user={user} handleSignOut={handleSignOut} />
      <Routes>
        {/* Redirect root path to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route path="/signup" element={<Signup />} />

        {/* Protect Questions route: If not logged in, redirect to Login */}
        <Route
          path="/questions"
          element={
            user.user_id ? (
              <ListQuestions user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
