// Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import NextQuiz from "./assets/NextQuizLogo.png"

export default function Navbar() {
  const { user, isLoggedin,logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand"><img src={NextQuiz} alt="" height="120px" /></Link>
        <Link to="/generate">Generate Quiz</Link>
        <Link to="/past">Past Quizzes</Link>
      </div>
      <div className="nav-right">
        {isLoggedin ? (
          <>
            <span className="welcome">Hi, {user.name}</span>
            <button className="btn-logout" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup" className="btn-signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
