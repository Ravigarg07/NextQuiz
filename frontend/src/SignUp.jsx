// SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {url} from "./config.js";

export default function SignUp() {
  const {user,setUser,setIsLoggedin} = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      alert("Please fill all fields.");
      return;
    }
    let result = await fetch(`${url}/register`,{
      method:'post',
      body:JSON.stringify({name,email,password}),
      headers:{
        "Content-Type": "application/json"
      }
    })
    result = await result.json();
    if(result.result=="Registration Successful!"){
      setUser({name:name,email:email});
      setIsLoggedin(true);
      localStorage.setItem("name",name);
      localStorage.setItem("email",email);
      navigate("/");
    }
    else{
      alert(result.result);
      navigate("/signin");
    }
    
  }

  return (
    <div className="card">
      <h1 style={{color:"white"}}>Create Account</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
