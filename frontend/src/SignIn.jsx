// SignIn.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {url} from "./config.js";

export default function SignIn() {
  const {user,setUser,setIsLoggedin} = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password) {
      alert("Please enter email and password.");
      return;
    }
    let result = await fetch(`${url}/login`,{
      method:'post',
      body:JSON.stringify({email,password}),
      headers:{
        "Content-Type": "application/json"
      }
    })
    result = await result.json();
    if(result.result=="user not found"){
      alert("Account not found please signup");
      navigate("/signup");
    }
    else{
      setUser({name:result.name,email:email});
      setIsLoggedin(true);
      localStorage.setItem("name",result.name);
      localStorage.setItem("email",email);
      navigate("/");
    }
  }

  function handleSpan(){
    navigate("/signup")
  }

  return (
    <div className="card">
      <h1 style={{color:"white"}}>Sign In</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <h3 style={{color:"white",fontWeight:"100"}}>If You don't have any account please <span style={{fontWeight:"400",textDecoration:"underline",cursor:"pointer"}} onClick={handleSpan}>SignUp</span></h3>
    </div>
  );
}
