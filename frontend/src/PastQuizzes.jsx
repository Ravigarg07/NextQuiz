// PastQuizzes.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { useNavigate } from "react-router";
import {url} from "./config.js";

export default function PastQuizzes({isQuizRunning, setIsQuizRunning}) {
  const { isLoggedin } = useAuth();
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const history = async () => {
    if(localStorage.getItem('email')==null){
      navigate('/signin');
      return;
    }
    const email = localStorage.getItem('email');
    let result = await fetch(`${url}/quiz-history/:${email}`);
    result = await result.json();
    setData(result);
  };
  useEffect(()=>{
    history();
  },[])

  async function handleStartQuiz(name,topic,ques,duration,difficulty,_id){
    setLoading(true);
    localStorage.removeItem("quiz");
    localStorage.removeItem("qize_name");
    let result = await fetch(`${url}/regenerateQuiz`,{
      method:'post',
      body:JSON.stringify({topic,ques,difficulty}),
      headers: {
          "Content-Type": "application/json",
        }
    });
    result = await result.json();
    setLoading(false);
    let temp = isQuizRunning;
    setIsQuizRunning(true);
    localStorage.setItem("quiz",result.quiz);
    localStorage.setItem("qize_name",name);
    localStorage.setItem("quiz_id",_id);
    localStorage.setItem("duration",duration);
  }

  return (
    <>
    {loading?<div className="loader"></div>:<div className="history">
      <h1 style={{ color: "white" }}>Past Quizzes</h1>
      <div className="history_data">

        {
          data.map((item)=>(

            <div className="quiz-card" key={item._id}>
          <div className="quiz-info">
            <div className="info-box">
              <div className="info-label">Name</div>
              <div className="info-value">{item.name}</div>
            </div>
            <div className="info-box">
              <div className="info-label">Topic</div>
              <div className="info-value">{item.topic}</div>
            </div>
            <div className="info-box">
              <div className="info-label">Date</div>
              <div className="info-value">{item.date.substring(0,10)}</div>
            </div>
            <div className="info-box">
              <div className="info-label">Time</div>
              <div className="info-value">{item.duration} mins</div>
            </div>
            <div className="info-box">
              <div className="info-label">Marks</div>
              <div className="info-value">{item.marks}/{item.ques}</div>
            </div>
            <div className="info-box">
              <div className="info-label">Difficulty</div>
              <div className="info-value">{item.difficulty}</div>
            </div>
          </div>
          <div className="quiz-footer">
            <button className="quiz-btn" onClick={(e)=>{handleStartQuiz(item.name,item.topic,item.ques,item.duration,item.difficulty,item._id)}}>Start Quiz</button>
          </div>
        </div>
          ))
        }

      </div>
    </div>}
    </>
  );
}
