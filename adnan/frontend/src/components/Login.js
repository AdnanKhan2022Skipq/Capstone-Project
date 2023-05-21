import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Login = ({showAlert}) => {
  const navigate=useNavigate()
  const [credential, setCredential] = useState({email: "", password: ""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email: credential.email, password: credential.password})
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        if (json.success) {
          //redirect
          showAlert("success","User has been Logged In Successfully !")
          localStorage.setItem('auth-token',json.authtoken)
          navigate('/MyNotes')
        }
        else{
          alert("invalid credentials")
        }
    }
    const onChange = (e) => {
      setCredential({...credential, [e.target.name]: e.target.value });
    };

  return (
    <div className="container my-5  p-5 d-flex justify-content-center align-items-center">
      <form className="border border-3 border-dark" onSubmit={handleSubmit} style={{ width: "600px",height:"350px"}}>
        
        <div className="my-4 mx-2">

          <label htmlFor="email" className="form-label " style={{ fontSize: "1.5rem" }}>Email address</label>
          <input type="email" className="form-control" value={credential.email} id="email" aria-describedby="emailHelp" name="email" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="my-4 mx-2">
          <label htmlFor="password" className="form-label" style={{ fontSize: "1.5rem" }}> Password</label>
          <input type="password" className="form-control" value={credential.password} id="password" name="password" onChange={onChange}/>
        </div>
        
        <button type="submit" className="btn btn-primary my-4 mx-2">
          Login
        </button>
      </form>
    </div>
  );
};
