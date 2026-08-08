import { useState } from "react";
import { useNavigate } from "react-router";
import QuizTimer from "./Timer";
import {url} from "./config.js";


export default function QuizSection({isQuizRunning, setIsQuizRunning}){
  const navigate = useNavigate();
  const Quiz_name = localStorage.getItem("qize_name");
  const parts = localStorage.getItem("quiz").split(/\d+\.\s\*\*Question:\*\*/).filter(Boolean);
  let questions = [];
  let options = [];
  let answers = [];
  const duration = parseInt(localStorage.getItem("duration"))*60;
  const [isResult,setIsResult] = useState(false);

  parts.forEach(block => {
  let lines = block.trim().split("\n").map(l => l.trim());

  questions.push(lines[0]);

  let ansLine = lines.find(l => l.includes("Correct Answer"));
  answers.push(ansLine.replace("**Correct Answer:**", "").trim());

  let joined = lines.filter(l => !l.includes("Correct Answer")).join(" ");

  let opts = joined.match(/[A-D][\).]\s.*?(?=\s*[A-D][\).]|$)/g) || [];
  options.push(opts.map(o => o.trim()));
});
  // console.log("Questions:", questions); 
  // console.log("Options:", options); 
  // console.log("Answers:", answers);

  const [submitAns,setSubmitAns] = useState(Array(questions.length).fill(null));

  function handleOption(ques,ans){
    let arr = submitAns;
    if(ans==1) arr[ques-1] = 'A';
    else if(ans==2) arr[ques-1] = 'B';
    else if(ans==3) arr[ques-1] = 'C';
    else arr[ques-1] = 'D';
    setSubmitAns(arr);
  }
  async function handleSubmit(){
    let marks = 0;
    answers.forEach((item,index)=>{
      if(item==submitAns[index]) marks++;
    })
    let quiz_id = localStorage.getItem("quiz_id");
    await fetch(`${url}/submitQuiz/${quiz_id}`,{
      method:'post',
      body:JSON.stringify({marks}),
      headers: {
          "Content-Type": "application/json",
        }
    });
    setIsResult(true);
  }

  const getColor = (idx,index)=>{
    let ans = answers[index];
    let submit = submitAns[index];
    let temp;
    if(idx==0) temp='A';
    else if(idx==1) temp='B';
    else if(idx==2) temp='C';
    else temp='D';
    if(ans==temp || submit==temp){
      if(ans==temp){
        return "#28a745";
      }
      else{
        return "#ff5555";
      }
    }
    return "none";

  }

  const handleExit = ()=>{
    setIsResult(false);
    let temp = isQuizRunning;
    setIsQuizRunning(false);
  }

  return(
    <>
    <div className="Quiz-Body">
    { isResult?
    <div className="quiz-container">
    <h1>{Quiz_name}</h1>
    {
      questions.map((q,index)=>(
        <div className="question-card" key={index}>
      <div className="question">{index+1}. {q}</div>
      <div className="options">
        {options[index].map((o,idx)=>(
          <label key={idx} style={{backgroundColor:getColor(idx,index)}}><input type="radio" name={index}/> {o}</label>
        ))}
      </div>
    </div>
      ))
    }
    <button onClick={handleExit}>Exit{" -> "}</button>
  </div>

      :<div>
      <QuizTimer totalSeconds={duration}  onExpire={handleSubmit} />
      <div className="quiz-container">
          
    <h1>{Quiz_name}</h1>
    {
      questions.map((q,index)=>(
        <div className="question-card" key={index}>
      <div className="question">{index+1}. {q}</div>
      <div className="options">
        {options[index].map((o,idx)=>(
          <label key={idx}><input type="radio" name={index} onClick={()=>{handleOption(index+1,idx+1)}} /> {o}</label>
        ))}
      </div>
    </div>
      ))
    }
    <button onClick={handleSubmit}>Submit Quiz</button>
  </div>
  </div>
    }
  </div>
  
    </>
  )
}
