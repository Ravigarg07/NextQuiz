// Home.jsx
import React from "react";
import { useNavigate } from "react-router";
import NextQuiz from "./assets/NextQuizLogo2.png";

export default function Home() {
  const navigate = useNavigate();
  const handleButton = ()=>{
    navigate("./generate")
  }
  return (
    <div className="card">
      <img src={NextQuiz} alt="Brand Logo" height="200px" />
      <h1 style={{color:"white",fontFamily:"arial",fontWeight:"200",fontSize:"45px",margin:"0"}}>Welcom To NextQuiz</h1>
      <p style={{color:"white",fontSize:"20px"}}>
        Generate AI-powered quizzes in seconds
      </p>
      <button onClick={handleButton}>Make A Quiz</button>
    </div>
  );
}
