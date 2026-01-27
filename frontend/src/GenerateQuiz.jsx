// GenerateQuiz.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function GenerateQuiz({isQuizRunning, setIsQuizRunning}) {
  const navigate = useNavigate();
  const { isLoggedin } = useAuth();

  const [name,setName] = useState("");
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [timeLimit, setTimeLimit] = useState(10);
  const [difficulty, setDifficulty] = useState("Easy");
  const [loading,setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if(!isLoggedin){
      navigate("/signin");
      alert("SignIn first!");
      return;
    }
    const email = localStorage.getItem('email');
    const ques = numQuestions.toString();
    const duration = timeLimit.toString();

    if (!topic.trim() || !name.trim()) {
      alert("Please fill all fields with valid values.");
      return;
    }

    const newQuiz = {
      email:email,
      topic: topic.trim(),
      name:name.trim(),
      duration: duration,
      difficulty:difficulty,
      ques: ques,
      date: new Date().toLocaleDateString(),
    };
    setLoading(true);
    let result = await fetch("http://localhost:5000/generateQuiz",{
      method:'post',
      body:JSON.stringify(newQuiz),
      headers: {
          "Content-Type": "application/json",
        }
    });
    result = await result.json();
    localStorage.setItem("quiz",result.quiz);
    localStorage.setItem("qize_name",name);
    localStorage.setItem("duration",duration);

    let temp = isQuizRunning;
    setIsQuizRunning(true);
    setLoading(false);
  }

  return (
    <>
    <div className="card">
      <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
      <h1 style={{color:"white"}}>{loading?"Generating....":"Generate a New Quiz"}</h1>
      </div>
       {loading?<div className="loader"></div>:<form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Quiz Name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter quiz name" required />
        </div>

        <div className="form-group">
          <label>Topic</label>
          <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. World History" required />
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label>Number of Questions</label>
            <input
              type="number"
              min="2"
              max="20"
              value={numQuestions}
              onChange={e => setNumQuestions(e.target.value)}
              required
            />
          </div>

          <div className="form-group half">
            <label>Time Limit (minutes)</label>
            <input
              type="number"
              min="1"
              value={timeLimit}
              onChange={e => setTimeLimit(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Difficulty</label>
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)} required>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
        <div style={{display:"flex",width:"100%",justifyContent:"center",marginTop:"30px"}}>
        <button type="submit">Generate Quiz</button>
        </div>
      </form>}
    </div>
    </>
  );
}