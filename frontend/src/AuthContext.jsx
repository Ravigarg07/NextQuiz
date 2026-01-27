// AuthContext.jsx
import React, { createContext, useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedin,setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("email")!==null){
      setUser({name:localStorage.getItem("name"),email:localStorage.getItem("email")});
      setIsLoggedin(true);
    }
  },[]);

  const logout = ()=>{
    setIsLoggedin(false);
    setUser(null);
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    navigate("/");
  }

  const value = {
    user,
    setUser,
    isLoggedin,
    setIsLoggedin,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
