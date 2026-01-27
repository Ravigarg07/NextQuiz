// App.jsx  (this is the entry file — mounts the app)
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext.jsx";
import { useAuth } from "./AuthContext.jsx";

import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import GenerateQuiz from "./GenerateQuiz.jsx";
import PastQuizzes from "./PastQuizzes.jsx";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";

import "./App.css";
import QuizSection from "./quiz.jsx";

function App() {
  const { user } = useAuth();
  const [isQuizRunning,setIsQuizRunning] = useState(false);
  return (
    <div>
      {isQuizRunning?<QuizSection isQuizRunning={isQuizRunning} setIsQuizRunning={setIsQuizRunning} />:
      <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<GenerateQuiz isQuizRunning={isQuizRunning} setIsQuizRunning={setIsQuizRunning} />} />
          <Route path="/past" element={<PastQuizzes isQuizRunning={isQuizRunning} setIsQuizRunning={setIsQuizRunning} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div></>}
    </div>
  );
}


export default App;
