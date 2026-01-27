import React, { useEffect, useState } from "react";
import "./Timer.css";
import stopWatch from "./assets/stopwatch.png"

function QuizTimer({ totalSeconds, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  useEffect(() => {
    if (timeLeft <= 0) {
      if (onExpire) onExpire();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Add dynamic classes based on remaining time
  let timerClass = "timer";
  if (timeLeft <= 30) timerClass += " danger";
  else if (timeLeft <= 60) timerClass += " warning";

  return (
    <div className={timerClass} style={{display:"flex",alignItems:"center"}}>
      <img src={stopWatch} alt="" width="30px" style={{marginRight:"10px"}} />
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}

export default QuizTimer;